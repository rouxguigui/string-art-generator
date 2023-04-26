import NailsLayer from "@/helpers/NailsLayer.js";
import StringLayer from "@/helpers/StringLayer.js";
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
            shape: `rectangle`,
            marginX: 25,// to display borders around
            marginY: 25,// to display borders around
            nailsBetweenLayers: -1,// -1 for auto
            strings: {
                width: 1
            }
        };

        if (window.innerWidth < 576) {
            this.board.resolution = 36;
        }

        this.nailsLayers = [];
        this.stringLayers = [];
    }

    getCenterX() {
        return this.board.width / 2;
    }
    getCenterY() {
        return this.board.width / 2;
    }
    convertToPx(size) {
        return size / 10 * this.board.resolution / 2.54;// 2.54 for inch to cm, then cm to mm
    }

    addLayer() {
        let layer = new StringLayer(this, this.stringLayers.length);
        this.stringLayers.push(layer);
        return layer;
    }

    addNailsLayer() {
        let nailsLayer = new NailsLayer(this, this.nailsLayers.length);
        this.nailsLayers.push(nailsLayer);
        return nailsLayer;
    }

    removeLayer(layer) {
        if (layer.type === `nails`) {
            this.nailsLayers.splice(this.nailsLayers.indexOf(layer), 1);
        } else if (layer.type === `string`) {
            this.stringLayers.splice(this.stringLayers.indexOf(layer), 1);
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
            stringLayers: this.stringLayers
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
            if (project.info) {
                this.info = project.info;
                this.nailsLayers = project.nailsLayers;
                this.stringLayers = project.stringLayers;
            } else {
                this.nailsLayers = [];
                this.addNailsLayer();
                // Switch from cm to mm
                this.board.width = this.board.width * 10;
                this.board.height = this.board.height * 10;
                this.stringLayers = project.layers;
                for (let layer of project.stringLayers) {
                    layer.type = `string`;
                }
            }
            this.saved = true;
        }
    }
}
