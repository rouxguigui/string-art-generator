<template>
    <div class="board">
        <div class="board-container" :class="boardClass" :style="{zoom: zoom}" :width="convertToPx(board.width) + 40" :height="convertToPx(board.height) + 60">
            <canvas id="board-canvas" :width="convertToPx(board.width)" :height="convertToPx(board.height)"
                    @mousemove="onMouseMove" @click="onClick" :class="{ 'record-mode': recordLayerPattern }"></canvas>
            <canvas id="overlay-canvas" :width="convertToPx(board.width)" :height="convertToPx(board.height)"></canvas>
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
        boardClass() {
          if (this.board.shape === `circle`) {
              return `board-rounded`;
          } else {
              return ``;
          }
        },
        nailsBetweenLayers() {
            if (this.board.nailsBetweenLayers === -1) {
                return this.project.getAutoNailsBetweenLayers();
            } else {
                return this.board.nailsBetweenLayers;
            }
        },
        resolution() {
            return this.board.resolution / 2.54;
        },
        centerX() {
            return this.convertToPx(this.board.width) / 2;
        },
        centerY() {
            return this.convertToPx(this.board.width) / 2;
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
        convertToPx(size) {
           return this.project.convertToPx(size);
        },
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
            let radius = this.convertToPx(this.board.nails.radius + 2) / 20;
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
            if (!this.settings.printMode) {
                this.drawLayers();
            }
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

            // Margins
            if (this.$store.state.settings.showMargins) {
                this.overlay.context.strokeStyle = 'magenta';
                this.overlay.context.setLineDash([5, 5]);
                this.overlay.context.lineHeight = 1;
                if (this.board.shape === `circle`) {
                    this.overlay.context.beginPath();
                    this.overlay.context.arc(this.convertToPx(this.board.width / 2), this.convertToPx(this.board.height / 2),
                            this.convertToPx(this.board.width / 2 - this.board.marginX), 0, Math.PI * 2);
                    this.overlay.context.stroke();
                } else {
                    this.overlay.context.strokeRect(this.convertToPx(this.board.marginX), this.convertToPx(this.board.marginY),
                            this.convertToPx(this.board.width - this.board.marginX * 2), this.convertToPx(this.board.height - this.board.marginY * 2));
                }
            }

            // if (this.nailHover) {
            //     this.overlay.context.fillStyle = '#c97413';
            //     this.overlay.context.strokeStyle = '#c97413';
            //     this.overlay.context.beginPath();
            //     this.overlay.context.arc(this.nailHover.x, this.nailHover.y, (this.board.nails.radius + 2) * this.resolution / 20, 0, Math.PI * 2);
            //     this.overlay.context.fill();
            //     this.overlay.context.fillText(this.nailHover.index + 1, this.nailHover.textX + 5, this.nailHover.textY + 5);
            // }
            // if (this.recordLayerPattern && this.layerSelected) {
            //     this.overlay.context.fillStyle = 'red';
            //     this.overlay.context.strokeStyle = 'red';
            //     let index = 0;
            //     for (let step of this.layerSelected.patternSteps) {
            //         let nail = this.getNail(step.nail);
            //         this.overlay.context.beginPath();
            //         this.overlay.context.arc(nail.x, nail.y, (this.board.nails.radius + 2) * this.resolution / 20, 0, Math.PI * 2);
            //         this.overlay.context.fill();
            //         this.overlay.context.fillText(index + 1, nail.textX + 5, nail.textY + 5);
            //         index++;
            //     }
            // } else if (this.nailSelected) {
            //     this.overlay.context.fillStyle = 'magenta';
            //     this.overlay.context.strokeStyle = 'magenta';
            //     this.overlay.context.beginPath();
            //     this.overlay.context.arc(this.nailSelected.x, this.nailSelected.y, (this.board.nails.radius + 2) * this.resolution / 20, 0, Math.PI * 2);
            //     this.overlay.context.fill();
            //     this.overlay.context.fillText(this.nailSelected.index + 1, this.nailSelected.textX + 5, this.nailSelected.textY + 5);
            //
            // }
            this.refreshOverlayRequired = false;
        },
        generateNails() {
            this.nails = [];
            for (let nailsLayer of this.nailsLayers) {
                this.nails = this.nails.concat(nailsLayer.getNails());
            }
        },
        drawGrid() {
            // this.canvas.context.strokeStyle = `#bbb`;
            // this.canvas.context.lineWidth = 1;
            // // Draw cross vertically and horizontally
            // if (this.$store.state.settings.middleLines) {
            //     this.canvas.context.beginPath();
            //     this.canvas.context.moveTo(0, this.centerY);
            //     this.canvas.context.lineTo(this.board.width * this.resolution, this.centerY);
            //     this.canvas.context.stroke();
            //     this.canvas.context.beginPath();
            //     this.canvas.context.moveTo(this.centerX, 0);
            //     this.canvas.context.lineTo(this.centerX, this.board.height * this.resolution);
            //     this.canvas.context.stroke();
            // }
            //
            // // Draw cross diagonal
            // if (this.$store.state.settings.diagonalLines) {
            //     this.canvas.context.beginPath();
            //     this.canvas.context.moveTo(0, 0);
            //     this.canvas.context.lineTo(this.board.width * this.resolution, this.board.height * this.resolution);
            //     this.canvas.context.stroke();
            //     this.canvas.context.beginPath();
            //     this.canvas.context.moveTo(0, this.board.height * this.resolution);
            //     this.canvas.context.lineTo(this.board.width * this.resolution, 0);
            //     this.canvas.context.stroke();
            // }
            //
            // if (this.settings.printMode) {
            //     this.canvas.context.strokeStyle = `#000`;
            //     this.canvas.context.beginPath();
            //     this.canvas.context.moveTo(this.centerX - 10, this.centerY);
            //     this.canvas.context.lineTo(this.centerX + 10, this.centerY);
            //     this.canvas.context.moveTo(this.centerX, this.centerY - 10);
            //     this.canvas.context.lineTo(this.centerX, this.centerY + 10);
            //     this.canvas.context.stroke();
            // }
        },
        drawNails() {
            this.canvas.context.textAlign = 'center';
            this.canvas.context.textBaseline = 'middle';
            for (let nailsLayer of this.nailsLayers) {
                nailsLayer.drawNails(this.canvas);
            }
        },
        drawLayers() {
            let index = 0;
            for (let layer of this.stringLayers) {
                this.drawLayer(index, layer);
                index++;
            }
        },
        drawLayer(index, layer) {
            if (!layer.visible || this.recordLayerPattern) {
                return false;
            }

            this.canvas.context.strokeStyle = layer.settings.color;
            this.canvas.context.lineWidth = this.board.strings.width;
            this.canvas.context.textAlign = 'center';
            this.canvas.context.textBaseline = 'middle';

            layer.length = 0;
            // let startNail = Math.round(-index * this.nailsBetweenLayers);
            // if (layer.startingNail !== 'auto' && !isNaN(parseInt(layer.startingNail))) {
            //     startNail = parseInt(layer.startingNail);
            // }
            const startNail = 0;
            let lastNail = this.getNail(startNail);
            this.canvas.context.beginPath();
            for (let i = 0; i < this.nails.length / 2; i++) {
                if (layer.settings.pattern === 'default') {
                    let nail = this.getNail(startNail + i);
                    this.canvas.context.moveTo(nail.x, nail.y);

                    let nail2 = this.getNail(startNail + i * 2 + this.nails.length / 2);
                    this.canvas.context.lineTo(nail2.x, nail2.y);

                    layer.length += Math.sqrt(Math.pow(nail2.cmX - nail.cmX, 2) + Math.pow(nail2.cmY - nail.cmY, 2)) * 2;
                } else {
                    for (let step of layer.settings.patternSteps) {
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
            layer.length = Math.round(layer.length / 1000);// mm to m
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
        },
        refreshScreenAndOverlay() {
            this.refreshRequired = true;
            this.refreshOverlayRequired = true;
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
        nailsLayers: {
            deep: true,
            handler() {
                this.refreshRequired = true;
            }
        },
        stringLayers: {
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

        &.board-rounded {
            canvas {
                border-radius: 50%;
            }
        }
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
