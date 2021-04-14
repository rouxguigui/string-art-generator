<template>
  <div class="board">
    <canvas id="board-canvas" :width="board.width * scale" :height="board.height * scale" :style="{zoom: zoom}"></canvas>
  </div>
</template>

<script>
  import {CanvasHelper} from "@/helpers/CanvasHelper.js";

  export default {
    name: 'board',
    props: {
      zoom: {type: Number, default: 1},
      scale: {type: Number, default: 15},
      board: {type: Object},
      layers: {type: Array}
    },
    data() {
      return {
        canvas: null
      }
    },
    mounted() {
      this.canvas = new CanvasHelper(`board-canvas`);
      this.redraw();
    },
    computed: {
      centerX() {
        return this.board.width * this.scale / 2;
      },
      centerY() {
        return this.board.width * this.scale / 2;
      }
    },
    methods: {
      redraw() {
        this.canvas.clear();
        this.drawNails();
      },
      drawNails() {
        this.canvas.context.strokeStyle = `#ddd`;
        this.canvas.context.strokeWidth = 1;
        // Draw cross vertically and horizontally
        this.canvas.context.beginPath();
        this.canvas.context.moveTo(0, this.centerY);
        this.canvas.context.lineTo(this.board.width * this.scale, this.centerY);
        this.canvas.context.stroke();
        this.canvas.context.beginPath();
        this.canvas.context.moveTo(this.centerX, 0);
        this.canvas.context.lineTo(this.centerX, this.board.height * this.scale);
        this.canvas.context.stroke();
        // Draw cross diagonal
        this.canvas.context.beginPath();
        this.canvas.context.moveTo(0, 0);
        this.canvas.context.lineTo(this.board.width * this.scale, this.board.height * this.scale);
        this.canvas.context.stroke();
        this.canvas.context.beginPath();
        this.canvas.context.moveTo(0, this.board.height * this.scale);
        this.canvas.context.lineTo(this.board.width * this.scale, 0);
        this.canvas.context.stroke();

        this.canvas.context.fillStyle = `#000`;
        this.canvas.context.beginPath();
        this.canvas.context.arc(this.centerX, this.centerY, 5, 0, Math.PI * 2);
        this.canvas.context.fill();

        this.canvas.context.fillStyle = `#bbb`;
        for (let i = 0; i < this.board.nails; i++) {
          this.canvas.context.beginPath();
          let angle = i * 360 / this.board.nails / (Math.PI / 2);
          this.canvas.context.arc(this.centerX + this.board.radius * this.scale * Math.cos(angle), this.centerY + this.board.radius * this.scale * Math.sin(angle), 2, 0, Math.PI * 2);
          this.canvas.context.fill();
        }

      }
    },
    watch: {
      board() {
        this.redraw();
      },
      layers() {
        this.redraw();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .board {
    canvas {
      background-color: white;
    }
  }
</style>
