import {generateGuid} from "@/utils.js";

export default class Layer {
    constructor(type, project, index) {
        this.project = project;
        this.index = index;
        this.type = type;
        this.id = generateGuid();
        this.name = `${this.index + 1}`;
        this.visible = true;
    }
}
