import Layer from "@/helpers/Layer.js";

export default class NailsLayer extends Layer {
    constructor(board, index) {
        super(`nails`, board, index);
        this.name = `Clous ${this.index + 1}`;
        this.autoResize = true;
        this.distanceBetweenNails = `auto`;
        this.shape = `circle`;
        this.circle = {
            x: `auto`,
            y: `auto`,
            radius: this.board.width / 2 - this.board.marginX,
            clockwise: true
        };
        this.rectangle = {
            x: this.board.marginX,
            y: this.board.marginY,
            width: this.board.width - this.board.marginX * 2,
            height: this.board.height - this.board.marginY * 2
        };
        this.line = {
            startX: this.board.marginX,
            startY: this.board.marginY,
            endX: this.board.width - this.board.margins * 2,
            endY: this.board.height - this.board.margins * 2
        };
        this.nails = {
            radius: 3, // in mm
            color: '#aaaaaa',
            quantity: 320
        };
    }
}
