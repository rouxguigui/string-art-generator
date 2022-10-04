import Layer from "@/helpers/Layer.js";

export default class NailsLayer extends Layer {
    constructor(project, index) {
        super(`nails`, project, index);
        this.name = `Clous ${this.index + 1}`;
        this.settings = {
            shape: `circle`,
            autoResize: true,
            distanceBetweenNails: `auto`,
            nails: {
                radius: 1.5, // in mm
                color: '#aaaaaa',
                quantity: 320
            },
            circle: {
                center: {
                    x: `auto`,
                    y: `auto`
                },
                radius: this.project.board.width / 2 - this.project.board.marginX,
                clockwise: true,
                startingAngle: 0
            },
            rectangle: {
                origin: {
                    x: this.project.board.marginX,
                    y: this.project.board.marginY
                },
                width: this.project.board.width - this.project.board.marginX * 2,
                height: this.project.board.height - this.project.board.marginY * 2
            },
            line: {
                start: {
                    x: this.project.board.marginX,
                    y: this.project.board.marginY
                },
                end: {
                    x: this.project.board.width - this.project.board.marginX * 2,
                    y: this.project.board.height - this.project.board.marginY * 2
                }
            }
        };
        this.nails = [];
    }

    convertToPx(size) {
        return this.project.convertToPx(size);
    }

    getNails() {
        if (this.settings.shape === `manual`) {
            return this.nails;
        }
        this.nails = [];
        if (this.settings.shape === `circle`) {
            let centerX = this.settings.circle.center.x;
            let centerY = this.settings.circle.center.y;
            if (centerX === `auto`) {
                centerX = this.project.getCenterX();
            }
            if (centerY === `auto`) {
                centerY = this.project.getCenterY();
            }
            const radius = this.convertToPx(this.settings.circle.radius);

            for (let i = 0; i < this.settings.nails.quantity; i++) {
                let angle = this.settings.circle.startingAngle + 90 + (this.settings.circle.clockwise ? -1 : 1) * i * 360 / this.settings.nails.quantity;// Get current angle
                angle *= Math.PI / 180;// Convert to rad
                this.nails.push({
                    index: this.nails.length,
                    id: this.index * 10000 + this.nails.length,
                    x: centerX + radius * Math.cos(angle),
                    y: centerY + radius * Math.sin(angle),
                    cmX: this.settings.circle.radius * Math.cos(angle),
                    cmY: this.settings.circle.radius * Math.sin(angle),
                    textX: centerX + 1.05 * radius * Math.cos(angle),
                    textY: centerY + 1.05 * radius * Math.sin(angle)
                });
            }
        } else if (this.settings.shape === `rectangle`) {
            let centerX = this.settings.circle.center.x;
            let centerY = this.settings.circle.center.y;
            if (centerX === `auto`) {
                centerX = this.project.getCenterX();
            }
            if (centerY === `auto`) {
                centerY = this.project.getCenterY();
            }
            const radius = this.convertToPx(this.settings.circle.radius);

            for (let i = 0; i < this.settings.nails.quantity; i++) {
                let angle = this.settings.circle.startingAngle + 90 + (this.settings.circle.clockwise ? -1 : 1) * i * 360 / this.settings.nails.quantity;// Get current angle
                angle *= Math.PI / 180;// Convert to rad
                this.nails.push({
                    index: this.nails.length,
                    id: this.index * 10000 + this.nails.length,
                    x: centerX + radius * Math.cos(angle),
                    y: centerY + radius * Math.sin(angle),
                    cmX: this.settings.circle.radius * Math.cos(angle),
                    cmY: this.settings.circle.radius * Math.sin(angle),
                    textX: centerX + 1.05 * radius * Math.cos(angle),
                    textY: centerY + 1.05 * radius * Math.sin(angle)
                });
            }
        }
        return this.nails;
    }

    drawNails(canvas) {
        const nailRadius = this.convertToPx(this.settings.nails.radius);

        canvas.context.fillStyle = this.settings.nails.color;
        canvas.context.strokeStyle = this.settings.nails.color;
        canvas.context.lineWidth = 1;

        // if (this.settings.printMode) {
        //     canvas.context.beginPath();
        //     canvas.context.arc(this.centerX, this.centerY, nailRadius, 0, Math.PI * 2);
        //     canvas.context.stroke();
        // }
        let index = 0;
        for (let nail of this.nails) {
            canvas.context.beginPath();
            if (this.settings.printMode) {
                canvas.context.moveTo(this.centerX + (nail.x - this.centerX) * 0.98, this.centerY + (nail.y - this.centerY) * 0.98);
                canvas.context.lineTo(nail.x, nail.y);
                canvas.context.stroke();
            } else {
                canvas.context.arc(nail.x, nail.y, nailRadius, 0, Math.PI * 2);
                canvas.context.fill();
            }
            if (this.settings.nailNumbers) {
                canvas.context.fillText(index + 1, nail.textX + 5, nail.textY + 5);
            }
            index += 1;
        }
    }
}
