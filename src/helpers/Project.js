import PaletteHelper from "@/helpers/PaletteHelper.js";

export default class Project {
    constructor(name = 'Nouveau projet') {
        this.id = `default`;
        this.name = name;

        this.board = {
            backgroundColor: '#ffffff',
            width: 55.88,
            height: 55.88,
            nails: 320,
            radius: 25,
            resolution: 25,
            shape: `circle`
        };

        if (window.innerWidth < 576) {
            this.board.resolution = 10;
        }

        this.layers = [];
    }

    addLayer() {
        this.layers.push({
            name: `Fil ${this.layers.length}`,
            color: PaletteHelper.getDefaultColor(this.layers.length),
            visible: true
        });
    }

    save() {
        let json = {
            name: this.name,
            board: this.board,
            layers: this.layers
        };
        localStorage.setItem('project-' + this.id, JSON.stringify(json));
    }

    load() {
        // Temporary for now
        let project = localStorage.getItem('project-default');
        if (project) {
            project = JSON.parse(project);
            this.name = project.name;
            this.board = project.board;
            this.layers = project.layers;
        }
    }
}
