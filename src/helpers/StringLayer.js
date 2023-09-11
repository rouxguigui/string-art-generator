import Layer from "@/helpers/Layer.js";
import PaletteHelper from "@/helpers/PaletteHelper.js";

export default class StringLayer extends Layer {
    constructor(project, index) {
        super(`string`, project, index);
        this.name = `Fil ${this.index + 1}`;
        this.settings = {
            color: PaletteHelper.getDefaultColor(this.index),
            visible: true,
            startingNail: 'auto',
            loopCount: 'auto',
            pattern: 'rectangle',
            patternSteps: []
        };
        this.stats = {
            length: 0,
            stepCount: 0
        };
    }

    convertToPx(size) {
        return this.project.convertToPx(size);
    }

    drawStrings(/*canvas, nails*/) {
        // todo move code from board.vue here
        // this.canvas.context.strokeStyle = layer.color;
        // this.canvas.context.lineWidth = this.board.strings.width;
        // this.canvas.context.textAlign = 'center';
        // this.canvas.context.textBaseline = 'middle';
        //
        // layer.length = 0;
        // let startNail = Math.round(-index * this.nailsBetweenLayers);
        // if (layer.startingNail !== 'auto' && !isNaN(parseInt(layer.startingNail))) {
        //     startNail = parseInt(layer.startingNail);
        // }
        // let lastNail = this.getNail(startNail);
        // this.canvas.context.beginPath();
        // for (let i = 0; i < this.nails.length / 2; i++) {
        //     if (layer.pattern === 'default') {
        //         let nail = this.getNail(startNail + i);
        //         this.canvas.context.moveTo(nail.x, nail.y);
        //
        //         let nail2 = this.getNail(startNail + i * 2 + this.nails.length / 2);
        //         this.canvas.context.lineTo(nail2.x, nail2.y);
        //
        //         layer.length += Math.sqrt(Math.pow(nail2.mmX - nail.mmX, 2) + Math.pow(nail2.mmY - nail.mmY, 2)) * 2;
        //     } else {
        //         for (let step of layer.patternSteps) {
        //             this.canvas.context.moveTo(lastNail.x, lastNail.y);
        //
        //             try {
        //                 let nail = null;
        //                 let delta = parseInt(step.delta);
        //                 if (delta) {
        //                     nail = this.getNail(lastNail.index + step.delta);
        //                 } else {
        //                     nail = this.getNail(startNail + eval(step.delta));
        //                 }
        //
        //                 if (nail) {
        //                     this.canvas.context.lineTo(nail.x, nail.y);
        //                     layer.length += Math.sqrt(Math.pow(nail.mmX - lastNail.mmX, 2) + Math.pow(nail.mmY - lastNail.mmY, 2)) * 2;
        //                     lastNail = nail;
        //                 }
        //             } catch {
        //                 layer.length = 0;
        //             }
        //         }
        //     }
        // }
        // layer.length = Math.round(layer.length / 100);
        // this.canvas.context.stroke();
    }
}
