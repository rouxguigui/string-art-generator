"use strict";

/**
 *    This class is intended to simplify multi canvas rendering
 *    Every canvas will automatically resize to fit te screen
 *    @param id {string}
 * @param width {int}
 * @param height {int}
 */
export class CanvasHelper {
    constructor(id) {
        this.element = document.getElementById(id);

        this.context = this.element.getContext("2d");
        this.context.strokeStyle = "#000";
        this.context.fillStyle = "#f26a63";
    }

    clear (backgroundColor, backgroundAlpha) {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
        if (backgroundColor) {
            this.fill(backgroundColor, backgroundAlpha);
        }
    }

    fill(color, alpha) {
        this.context.globalAlpha = alpha || 1;
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.element.width, this.element.height);
        this.context.globalAlpha = 1;
    }
}
