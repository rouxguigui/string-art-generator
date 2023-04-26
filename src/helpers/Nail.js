export default class Nail {
    constructor(nailsLayer, index, mmX, mmY) {
        this.nailsLayers = nailsLayer;
        this.index = index;
        this.id = nailsLayer.index * 10000 + index;
        this.mmX = mmX;
        this.mmY = mmY;
        this.radius = nailsLayer.settings.nails.radius;
        this.x = this.nailsLayers.convertToPx(mmX);
        this.y = this.nailsLayers.convertToPx(mmY);
        this.textX = this.x + 10;
        this.textY = this.y + 10;
    }
}
