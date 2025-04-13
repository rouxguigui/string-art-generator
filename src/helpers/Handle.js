export default class Handle {
    constructor(layer, mmX, mmY, anchorX = `left`, anchorY = `top`) {
        this.layer = layer;
        this.mmX = mmX;
        this.mmY = mmY;
        this.anchorX = anchorX;
        this.anchorY = anchorY;
    }
    
    getX() {
        switch (this.anchorX) {
            case `center`:
                return this.layer.convertToPx(this.layer.project.getCenterX() + this.mmX);
            case `left`:
                return this.layer.convertToPx(this.mmX);
            case `right`:
                return this.layer.convertToPx(this.layer.project.width - this.mmX);
        }
    }
    
    getY() {
        switch (this.anchorY) {
            case `center`:
                return this.layer.convertToPx(this.layer.project.getCenterY() + this.mmY);
            case `top`:
                return this.layer.convertToPx(this.mmY);
            case `bottom`:
                return this.layer.convertToPx(this.layer.project.height - this.mmY);
        }
    }
}
