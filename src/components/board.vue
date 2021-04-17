<template>
    <div class="board">
        <canvas id="board-canvas" :width="board.width * resolution" :height="board.height * resolution"
                :style="{transform: 'scale(' + zoom + ')'}"></canvas>
    </div>
</template>

<script>
import {CanvasHelper} from "@/helpers/CanvasHelper.js";

export default {
    name: 'board',
    props: {
        zoom: {type: Number}
    },
    data() {
        return {
            refreshRequired: true,
            canvas: null,
            drawing: false,
            nails: []
        }
    },
    computed: {
        resolution() {
            return this.board.resolution;
        },
        centerX() {
            return this.board.width * this.resolution / 2;
        },
        centerY() {
            return this.board.width * this.resolution / 2;
        }
    },
    mounted() {
        this.canvas = new CanvasHelper(`board-canvas`);
        this.redraw();
    },
    created() {
        this.updateLoop();
    },
    methods: {
        updateLoop() {
            window.requestAnimationFrame(() => {
                if (this.refreshRequired) {
                    this.redraw();
                }
                this.updateLoop();
            });
        },
        generateNails() {
            this.nails = [];
            for (let i = 0; i < this.board.nails; i++) {
                let angle = 90 - i * 360 / this.board.nails;// Get current angle
                angle *= Math.PI / 180;// Convert to rad
                this.nails.push({
                    x: this.centerX + this.board.radius * this.resolution * Math.cos(angle),
                    y: this.centerY + this.board.radius * this.resolution * Math.sin(angle),
                    textX: this.centerX + 1.05 * this.board.radius * this.resolution * Math.cos(angle),
                    textY: this.centerY + 1.05 * this.board.radius * this.resolution * Math.sin(angle)
                });
            }
        },
        redraw() {
            if (this.drawing) {
                return false;
            }
            this.drawing = true;
            this.canvas.clear();
            this.generateNails();
            this.drawLayers();
            this.drawNails();
            this.refreshRequired = false;
            this.drawing = false;
        },
        drawNails() {
            this.canvas.context.strokeStyle = `#bbb`;
            this.canvas.context.lineWidth = 1;
            // Draw cross vertically and horizontally
            // this.canvas.context.beginPath();
            // this.canvas.context.moveTo(0, this.centerY);
            // this.canvas.context.lineTo(this.board.width * this.resolution, this.centerY);
            // this.canvas.context.stroke();
            // this.canvas.context.beginPath();
            // this.canvas.context.moveTo(this.centerX, 0);
            // this.canvas.context.lineTo(this.centerX, this.board.height * this.resolution);
            // this.canvas.context.stroke();
            // Draw cross diagonal
            this.canvas.context.beginPath();
            this.canvas.context.moveTo(0, 0);
            this.canvas.context.lineTo(this.board.width * this.resolution, this.board.height * this.resolution);
            this.canvas.context.stroke();
            this.canvas.context.beginPath();
            this.canvas.context.moveTo(0, this.board.height * this.resolution);
            this.canvas.context.lineTo(this.board.width * this.resolution, 0);
            this.canvas.context.stroke();

            // this.canvas.context.fillStyle = `#000`;
            // this.canvas.context.beginPath();
            // this.canvas.context.arc(this.centerX, this.centerY, 5, 0, Math.PI * 2);
            // this.canvas.context.fill();

            this.canvas.context.fillStyle = `#aaa`;
            // let index = 0;
            for (let nail of this.nails) {
                this.canvas.context.beginPath();
                this.canvas.context.arc(nail.x, nail.y, 3, 0, Math.PI * 2);
                this.canvas.context.fill();
                // this.canvas.context.strokeText(index, nail.textX + 5, nail.textY + 5);
                // index += 1;
            }
        },
        drawLayers() {
            let index = 0;
            for (let layer of this.layers) {
                this.drawLayer(index, layer);
                index++;
            }
        },
        drawLayer(index, layer) {
            if (!layer.visible) {
                return false;
            }

            this.canvas.context.strokeStyle = layer.color;
            this.canvas.context.lineWidth = 1;

            let startNail = -index * this.board.nails / (this.layers.length - 1) / 2;
            this.canvas.context.beginPath();
            for (let i = 0; i < this.board.nails / 2; i++) {
                let nail = this.nails[this.modulo((startNail + i), this.board.nails)];
                this.canvas.context.moveTo(nail.x, nail.y);

                nail = this.nails[this.modulo(startNail + i * 2 + this.board.nails / 2, this.board.nails)];
                this.canvas.context.lineTo(nail.x, nail.y);
            }
            this.canvas.context.stroke();
        },
        modulo: function (x, y) {
            const mod = Number(x) % Number(y);
            if (mod < 0) {
                return y + mod;
            } else {
                return mod;
            }
        }
    },
    watch: {
        board: {
            deep: true,
            handler() {
                this.refreshRequired = true;
            }
        },
        layers: {
            deep: true,
            handler() {
                this.refreshRequired = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.board {
    canvas {
        margin: 60px 30px 30px;
        background-color: white;
    }

    @media(max-width: 576px) {
        canvas {
            margin: 10px 60px 10px 10px;
        }
    }
}
</style>
