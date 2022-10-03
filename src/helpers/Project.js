import NailsLayer from "@/helpers/NailsLayer.js";
import PaletteHelper from "@/helpers/PaletteHelper.js";
import {generateGuid} from "@/utils.js";

export default class Project {
    constructor(name = 'Nouveau projet') {
        this.id = generateGuid();
        this.name = name;
        this.saved = false;

        this.info = {
            version: 0.2,
            creationDate: new Date(),
            lastModification: new Date()
        }

        this.board = {
            backgroundColor: '#ffffff',
            width: 560,
            height: 560,
            radius: 25,
            resolution: 72,
            unit: `mm`,
            shape: `square`,
            startingAngle: 0,
            marginX: 25,// to display borders around
            marginY: 25,// to display borders around
            clockwise: true,
            nails: {
                radius: 3,
                color: '#aaaaaa',
                quantity: 320
            },
            nailsBetweenLayers: -1,// -1 for auto
            strings: {
                width: 1
            }
        };

        if (window.innerWidth < 576) {
            this.board.resolution = 36;
        }

        this.nailsLayers = [];
        this.layers = [];
    }

    addLayer() {
        let layer = {
            index: this.layers.length,
            type: `string`,
            id: generateGuid(),
            length: 0,
            name: `Fil ${this.layers.length + 1}`,
            color: PaletteHelper.getDefaultColor(this.layers.length),
            visible: true,
            startingNail: 'auto',
            pattern: 'default',
            patternSteps: []
        };
        this.layers.push(layer);
        return layer;
    }

    addNailsLayer() {
        let nailsLayer = new NailsLayer(this.board, this.nailsLayers.length);
        this.nailsLayers.push(nailsLayer);
        return nailsLayer;
    }

    getAutoNailsBetweenLayers() {
        if (this.layers.length === 1) {
            return 0;
        } else if (this.board.nails) {
            return this.board.nails.quantity / (this.layers.length - 1) / 2;
        } else {
            return 10;
        }
    }

    removeLayer(layer) {
        if (layer.type === `nails`) {
            this.nailsLayers.splice(this.nailsLayers.indexOf(layer), 1);
        } else if (layer.type === `string`) {
            this.layers.splice(this.layers.indexOf(layer), 1);
        }
    }

    getRecentProjects() {
        let projects = localStorage.getItem('projects');
        if (!projects) {
            projects = [];
        } else {
            projects = JSON.parse(projects);
        }
        return projects;
    }

    saveAs(newName) {
        this.name = newName;
        this.id = generateGuid();
        let projects = this.getRecentProjects();
        projects.push({
            name: this.name,
            id: this.id,
            date_creation: new Date(),
            date_edition: new Date()
        });
        this.createLocalSave();
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    save() {
        let projects = this.getRecentProjects();
        let project = projects.find(p => p.id === this.id);
        if (project) {
            project.date_edition = new Date();
            project.name = this.name;
            localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            console.error("Missing project in recent projects list");
        }
        this.createLocalSave();
    }

    createLocalSave() {
        this.info.lastModification = new Date();
        let json = {
            id: this.id,
            name: this.name,
            board: this.board,
            info: this.info,
            nailsLayers: this.nailsLayers,
            layers: this.layers
        };
        json = JSON.stringify(json);

        localStorage.setItem('project-' + this.id, json);
        this.saved = true;
    }

    open(id) {
        // Temporary for now
        let project = localStorage.getItem(`project-${id}`);
        if (project) {
            project = JSON.parse(project);
            this.name = project.name;
            this.id = project.id;
            this.board = project.board;
            this.layers = project.layers;
            if (project.info) {
                this.info = project.info;
                this.nailsLayers = project.nailsLayers;
            } else {
                this.nailsLayers = [];
                this.addNailsLayer();
                // Switch from cm to mm
                this.board.width * 10;
                this.board.height * 10;
                for (let layer of project.layers) {
                    layer.type = `string`;
                }
            }
            this.saved = true;
        }
    }
}
