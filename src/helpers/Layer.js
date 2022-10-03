import {generateGuid} from "@/utils.js";

export default class Layer {
    constructor(type, board, index) {
        this.board = board;
        this.index = index;
        this.type = `nails`;
        this.id = generateGuid();
        this.name = `${this.index + 1}`;
        this.visible = true;
    }
}
