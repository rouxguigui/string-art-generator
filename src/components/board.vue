<template>
    <div class="board">
        <div class="board-container" :style="{zoom: zoom}" :width="board.width * resolution + 40"
             :height="board.height * resolution + 60">
            <canvas id="board-canvas" :width="board.width * resolution" :height="board.height * resolution"
                    @mousemove="onMouseMove" @click="onClick" :class="{ 'record-mode': recordLayerPattern }"></canvas>
            <canvas id="overlay-canvas" :width="board.width * resolution" :height="board.height * resolution"></canvas>
        </div>
    </div>
</template>

<script>
import {CanvasHelper} from "@/helpers/CanvasHelper.js";

export default {
    name: 'board',
    props: {
        zoom: {type: Number},
        layerSelected: {}
    },
    data() {
        return {
            refreshRequired: true,
            refreshOverlayRequired: true,
            canvas: null,
            drawing: false,
            nailHover: null,
            nailSelected: null,
            nails: []
        }
    },
    computed: {
        nailsBetweenLayers() {
            if (this.board.nailsBetweenLayers === -1) {
                if (this.layers.length === 1) {
                    return 0;
                } else if (this.nails) {
                    return this.nails.length / (this.layers.length - 1) / 2;
                } else {
                    return 10;
                }
            } else {
                return this.board.nailsBetweenLayers;
            }
        },
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
        this.overlay = new CanvasHelper(`overlay-canvas`);
        this.redraw();
    },
    created() {
        this.updateLoop();
    },
    methods: {
        onMouseMove(evt) {
            this.nailHover = this.findNailByMouseEvt(evt);
            this.refreshOverlayRequired = true;
        },
        onClick(evt) {
            const lastNailSelected = this.nailSelected;
            this.nailSelected = this.findNailByMouseEvt(evt);
            this.refreshOverlayRequired = true;
            this.$emit('nail-selected', this.nailSelected, lastNailSelected);
        },
        findNailByMouseEvt(evt) {
            let radius = (this.board.nails.radius + 2) * this.resolution / 20;
            return this.nails.find(n => {
                return n.x - radius < evt.offsetX / this.zoom && evt.offsetX / this.zoom < n.x + radius &&
                        n.y - radius < evt.offsetY / this.zoom && evt.offsetY / this.zoom < n.y + radius;
            });
        },
        updateLoop() {
            window.requestAnimationFrame(() => {
                if (this.refreshRequired) {
                    this.redraw();
                }
                if (this.refreshOverlayRequired) {
                    this.drawOverlay();
                }
                this.updateLoop();
            });
        },
        redraw() {
            if (this.drawing) {
                return false;
            }
            this.drawing = true;
            this.canvas.clear(this.board.backgroundColor);
            this.generateNails();
            this.drawGrid();
            this.drawLayers();
            this.drawNails();
            this.drawOverlay();
            this.refreshRequired = false;
            this.drawing = false;
        },
        drawOverlay() {
            this.overlay.clear();
            this.overlay.context.textAlign = 'center';
            this.overlay.context.textBaseline = 'middle';
            this.overlay.context.font = '15pt Arial';
            if (this.nailSelected) {
                this.overlay.context.fillStyle = 'magenta';
                this.overlay.context.strokeStyle = 'magenta';
                this.overlay.context.beginPath();
                this.overlay.context.arc(this.nailSelected.x, this.nailSelected.y, (this.board.nails.radius + 2) * this.resolution / 20, 0, Math.PI * 2);
                this.overlay.context.fill();
                this.overlay.context.fillText(this.nailSelected.index + 1, this.nailSelected.textX + 5, this.nailSelected.textY + 5);

            }
            if (this.nailHover) {
                this.overlay.context.fillStyle = '#c97413';
                this.overlay.context.strokeStyle = '#c97413';
                this.overlay.context.beginPath();
                this.overlay.context.arc(this.nailHover.x, this.nailHover.y, (this.board.nails.radius + 2) * this.resolution / 20, 0, Math.PI * 2);
                this.overlay.context.fill();
                this.overlay.context.fillText(this.nailHover.index + 1, this.nailHover.textX + 5, this.nailHover.textY + 5);
            }
            if (this.recordLayerPattern && this.layerSelected) {
                this.overlay.context.fillStyle = 'red';
                this.overlay.context.strokeStyle = 'red';
                for (let step in this.layerSelected.patternSteps) {
                    let nail = this.getNail(step.index);
                    this.overlay.context.beginPath();
                    this.overlay.context.arc(nail.x, nail.y, (this.board.nails.radius + 2) * this.resolution / 20, 0, Math.PI * 2);
                    this.overlay.context.fill();
                    this.overlay.context.fillText(nail.index + 1, nail.textX + 5, nail.textY + 5);
                }
            }
            this.refreshOverlayRequired = false;
        },
        generateNails() {
            this.nails = [];
            for (let i = 0; i < this.board.nails.quantity; i++) {
                let angle = this.board.startingAngle + 90 + (this.board.clockwise ? -1 : 1) * i * 360 / this.board.nails.quantity;// Get current angle
                angle *= Math.PI / 180;// Convert to rad
                this.nails.push({
                    index: this.nails.length,
                    x: this.centerX + this.board.radius * this.resolution * Math.cos(angle),
                    y: this.centerY + this.board.radius * this.resolution * Math.sin(angle),
                    cmX: this.board.radius * Math.cos(angle),
                    cmY: this.board.radius * Math.sin(angle),
                    textX: this.centerX + 1.05 * this.board.radius * this.resolution * Math.cos(angle),
                    textY: this.centerY + 1.05 * this.board.radius * this.resolution * Math.sin(angle)
                });
            }
        },
        drawGrid() {
            this.canvas.context.strokeStyle = `#bbb`;
            this.canvas.context.lineWidth = 1;
            // Draw cross vertically and horizontally
            if (this.$store.state.settings.middleLines) {
                this.canvas.context.beginPath();
                this.canvas.context.moveTo(0, this.centerY);
                this.canvas.context.lineTo(this.board.width * this.resolution, this.centerY);
                this.canvas.context.stroke();
                this.canvas.context.beginPath();
                this.canvas.context.moveTo(this.centerX, 0);
                this.canvas.context.lineTo(this.centerX, this.board.height * this.resolution);
                this.canvas.context.stroke();
            }

            // Draw cross diagonal
            if (this.$store.state.settings.diagonalLines) {
                this.canvas.context.beginPath();
                this.canvas.context.moveTo(0, 0);
                this.canvas.context.lineTo(this.board.width * this.resolution, this.board.height * this.resolution);
                this.canvas.context.stroke();
                this.canvas.context.beginPath();
                this.canvas.context.moveTo(0, this.board.height * this.resolution);
                this.canvas.context.lineTo(this.board.width * this.resolution, 0);
                this.canvas.context.stroke();
            }
        },
        drawNails() {
            this.canvas.context.textAlign = 'center';
            this.canvas.context.textBaseline = 'middle';
            this.canvas.context.fillStyle = this.board.nails.color;
            let index = 0;
            for (let nail of this.nails) {
                this.canvas.context.beginPath();
                this.canvas.context.arc(nail.x, nail.y, this.board.nails.radius * this.resolution / 20, 0, Math.PI * 2);
                this.canvas.context.fill();
                if (this.settings.nailNumbers) {
                    this.canvas.context.fillText(index + 1, nail.textX + 5, nail.textY + 5);
                }
                index += 1;
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
            if (!layer.visible || this.recordLayerPattern) {
                return false;
            }

            this.canvas.context.strokeStyle = layer.color;
            this.canvas.context.lineWidth = this.board.strings.width;
            this.canvas.context.textAlign = 'center';
            this.canvas.context.textBaseline = 'middle';

            layer.length = 0;
            let startNail = Math.round(-index * this.nailsBetweenLayers);
            let lastNail = this.getNail(startNail);
            this.canvas.context.beginPath();
            for (let i = 0; i < this.nails.length / 2; i++) {
                if (layer.pattern === 'default') {
                    let nail = this.getNail(startNail + i);
                    this.canvas.context.moveTo(nail.x, nail.y);

                    let nail2 = this.getNail(startNail + i * 2 + this.nails.length / 2);
                    this.canvas.context.lineTo(nail2.x, nail2.y);

                    layer.length += Math.sqrt(Math.pow(nail2.cmX - nail.cmX, 2) + Math.pow(nail2.cmY - nail.cmY, 2)) * 2;
                } else {
                    for (let step of layer.patternSteps) {
                        this.canvas.context.moveTo(lastNail.x, lastNail.y);

                        try {
                            let nail = null;
                            let delta = parseInt(step.delta);
                            if (delta) {
                                nail = this.getNail(lastNail.index + step.delta);
                            } else {
                                nail = this.getNail(startNail + eval(step.delta));
                            }

                            if (nail) {
                                this.canvas.context.lineTo(nail.x, nail.y);
                                layer.length += Math.sqrt(Math.pow(nail.cmX - lastNail.cmX, 2) + Math.pow(nail.cmY - lastNail.cmY, 2)) * 2;
                                lastNail = nail;
                            }
                        } catch {
                            layer.length = 0;
                        }
                    }
                }
            }
            layer.length = Math.round(layer.length / 100);
            this.canvas.context.stroke();
        },
        modulo: function (x, y) {
            const mod = Number(x) % Number(y);
            if (mod < 0) {
                return y + mod;
            } else {
                return mod;
            }
        },
        getNail(index) {
            return this.nails[this.modulo(Math.round(index), this.nails.length)];
        }
    },
    watch: {
        board: {
            deep: true,
            handler() {
                this.refreshRequired = true;
            }
        },
        settings: {
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
    .board-container {
        position: relative;
    }

    canvas {
        margin: 50px 10px 10px 10px;
    }

    #board-canvas {
        &.record-mode {
            outline: 2px solid red !important;
        }

    }

    #overlay-canvas {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }
}
</style>
