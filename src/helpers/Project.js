import PaletteHelper from "@/helpers/PaletteHelper.js";
import {generateGuid} from "@/utils.js";

export default class Project {
    constructor(name = 'Nouveau projet') {
        this.id = generateGuid();
        this.name = name;
        this.saved = false;

        this.board = {
            backgroundColor: '#ffffff',
            width: 55.88,
            height: 55.88,
            radius: 25,
            resolution: 25,
            shape: `circle`,
            startingAngle: 0,
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
            this.board.resolution = 10;
        }

        this.layers = [];
    }

    addLayer() {
        let layer = {
            index: this.layers.length,
            id: generateGuid(),
            length: 0,
            name: `Fil ${this.layers.length + 1}`,
            color: PaletteHelper.getDefaultColor(this.layers.length),
            visible: true,
            pattern: 'default',
            patternSteps: []
        };
        this.layers.push(layer);
        return layer;
    }

    removeLayer(layer) {
        this.layers.splice(this.layers.indexOf(layer), 1);
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
        let json = {
            id: this.id,
            name: this.name,
            board: this.board,
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
            this.saved = true;
        }
    }
}
