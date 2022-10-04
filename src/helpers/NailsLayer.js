import Layer from "@/helpers/Layer.js";
import Nail from "@/helpers/Nail.js";
import {evaluate} from "mathjs"
import {roundTo1} from "@/utils.js";

export default class NailsLayer extends Layer {
    constructor(project, index) {
        super(`nails`, project, index);
        this.name = `Clous ${this.index + 1}`;
        this.settings = {
            shape: `polar`,
            autoResize: true,
            nails: {
                radius: 1.5, // in mm
                color: '#aaaaaa',
                positionBy: `quantity`,
                quantity: 100,
                distanceBetweenNails: `auto`,
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
            },
            cartesian: {
                formula: `x*x/1000`,
                minX: -250,
                maxX: 250
            },
            polar: {
                formula: `50*exp(0.25*t)`,
                // formula: `500*sin(4*t)`,
                minT: 0,
                maxT: Math.PI * 2
            }
        };
        this.nails = [];
        this.updateDistanceBetweenNails();
        this.generateNails();
    }

    convertToPx(size) {
        return this.project.convertToPx(size);
    }

    getShapePerimeter() {
        switch (this.settings.shape) {
            case `circle`:
                return 2 * Math.PI * this.settings.circle.radius;
            case `rectangle`:
                return (this.settings.rectangle.width + this.settings.rectangle.height) * 2;
            case `line`:
                return Math.sqrt(Math.pow(this.settings.line.end.x - this.settings.line.start.x, 2) +
                    Math.pow(this.settings.line.end.y - this.settings.line.start.y, 2));
        }
    }

    updateDistanceBetweenNails() {
        if (this.shape === `manual`) {
            return false;
        }
        this.settings.positionBy = `quantity`;
        this.settings.nails.distanceBetweenNails = roundTo1(this.getShapePerimeter() / this.settings.nails.quantity);

        this.generateNails();
    }

    updateNailsQuantity() {
        if (this.shape === `manual`) {
            return false;
        }
        this.settings.positionBy = `distance`;
        this.settings.nails.quantity = roundTo1(this.getShapePerimeter() / this.settings.nails.distanceBetweenNails);

        this.generateNails();
    }

    addNail(mmX, mmY) {
        const nail = new Nail(this, this.nails.length, mmX, mmY);
        this.nails.push(nail);
        return nail;
    }

    getNails() {
        return this.nails;
    }

    generateNails() {
        if (this.settings.shape === `manual`) {
            return this.nails;
        }
        this.nails = [];

        let centerX = this.project.getCenterX();
        let centerY = this.project.getCenterY();
        let angle = 0;
        let i = 0;
        let x = 0;
        let y = 0;
        let progress = 0;
        let formula;

        if (this.settings.shape === `circle`) {
            if (this.settings.circle.center.x !== `auto`) {
                centerX = this.settings.circle.center.x;
            }
            if (this.settings.circle.center.y !== `auto`) {
                centerY = this.settings.circle.center.y;
            }

            for (i = 0; i < this.settings.nails.quantity; i++) {
                angle = this.settings.circle.startingAngle + 90 + (this.settings.circle.clockwise ? -1 : 1) * i * 360 / this.settings.nails.quantity;// Get current angle
                angle *= Math.PI / 180;// Convert to rad
                this.addNail(centerX + this.settings.circle.radius * Math.cos(angle), centerY + this.settings.circle.radius * Math.sin(angle));
            }
        } else if (this.settings.shape === `rectangle`) {
            let countX = this.settings.rectangle.width / this.settings.nails.distanceBetweenNails;
            let countY = this.settings.rectangle.height / this.settings.nails.distanceBetweenNails;

            for (let y = 0; y < countY; y++) {
                this.addNail(this.settings.rectangle.origin.x,
                    this.settings.rectangle.origin.y + y * this.settings.nails.distanceBetweenNails);
                this.addNail(this.settings.rectangle.origin.x + this.settings.rectangle.width,
                    this.settings.rectangle.origin.y + y * this.settings.nails.distanceBetweenNails);
            }

            for (let x = 0; x < countX; x++) {
                this.addNail(this.settings.rectangle.origin.x + x * this.settings.nails.distanceBetweenNails,
                    this.settings.rectangle.origin.y);
                this.addNail(this.settings.rectangle.origin.x + x * this.settings.nails.distanceBetweenNails,
                    this.settings.rectangle.origin.y + this.settings.rectangle.height);
            }
        } else if (this.settings.shape === `line`) {
            for (i = 0; i < this.settings.nails.quantity; i++) {
                progress = i / this.settings.nails.quantity;
                this.addNail(this.settings.line.start.x * (1 - progress) + this.settings.line.end.x * progress,
                    this.settings.line.start.y * (1 - progress) + this.settings.line.end.y * progress);
            }
        } else if (this.settings.shape === `cartesian`) {
            for (i = 0; i < this.settings.nails.quantity; i++) {
                progress = i / this.settings.nails.quantity;
                x = this.settings.cartesian.minX * (1 - progress) + this.settings.cartesian.maxX * progress;
                try {
                    formula = this.settings.cartesian.formula.replace(/x/gi, x);
                    y = evaluate(formula);
                } catch(e) {
                    console.warn(e);
                }
                this.addNail(centerX + x, centerY + y);
            }
        } else if (this.settings.shape === `polar`) {
            let r;
            for (i = 0; i < this.settings.nails.quantity; i++) {
                try {
                    progress = i / this.settings.nails.quantity;
                    angle = this.settings.polar.minT * progress + this.settings.polar.maxT * (1 - progress);
                    formula = this.settings.polar.formula.replace(/t/gi, angle);
                    r = evaluate(formula);
                    x = r * Math.cos(angle);
                    y = r * Math.sin(angle);
                } catch(e) {
                    console.warn(e);
                }
                this.addNail(centerX + x, centerY + y);
            }
        }
        return this.nails;
    }

    drawNails(canvas) {
        if (!this.visible) {
            return false;
        }
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

    drawOverlay(overlay) {
        if (!this.visible) {
            return false;
        }
        switch (this.settings.shape) {
            case `line`:
                overlay.drawCross(this.convertToPx(this.settings.line.start.x), this.convertToPx(this.settings.line.start.y));
                overlay.drawCross(this.convertToPx(this.settings.line.end.x), this.convertToPx(this.settings.line.end.y));
                break;
        }
    }
}
