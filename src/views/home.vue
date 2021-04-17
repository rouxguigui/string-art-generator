<template>
    <div id="home">
        <b-navbar class="main-menu" variant="dark" fixed="top">
            <b-btn variant="dark" v-if="isMobile" @click="$store.state.mobilePropertiesExtended = !$store.state.mobilePropertiesExtended">
                <i class="far fa-bars"></i>
            </b-btn>
            <template v-if="project">
            <b-dropdown text="Menu" no-caret>
                <b-dropdown-item @click="newProject">Nouveau</b-dropdown-item>
<!--                <b-dropdown-item @click="project.open">Ouvrir</b-dropdown-item>-->
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="saveOrSaveAs">Enregistrer</b-dropdown-item>
                <b-dropdown-item @click="saveAs">Enregistrer Sous</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="closeProject">Fermer le projet</b-dropdown-item>
            </b-dropdown>
            <b-dropdown text="Affichage" no-caret>
                <b-dropdown-item @click="$store.state.settings.middleLines = !$store.state.settings.middleLines">
                    <b-checkbox :checked="$store.state.settings.middleLines">Afficher repère central</b-checkbox>
                </b-dropdown-item>
                <b-dropdown-item @click="$store.state.settings.diagonalLines = !$store.state.settings.diagonalLines">
                    <b-checkbox :checked="$store.state.settings.diagonalLines">Afficher lignes diagonale</b-checkbox>
                </b-dropdown-item>
                <b-dropdown-item @click="$store.state.settings.nailNumbers = !$store.state.settings.nailNumbers">
                    <b-checkbox :checked="$store.state.settings.nailNumbers">Afficher le numéro des clous</b-checkbox>
                </b-dropdown-item>
            </b-dropdown>
                <b-btn variant="transparent" @click.stop="saveOrSaveAs"><i class="far fa-save"></i></b-btn>
                <b-btn variant="transparent" disabled @click.stop=""><i class="far fa-undo"></i></b-btn>
                <b-btn variant="transparent" disabled @click.stop=""><i class="far fa-redo"></i></b-btn>
                <div class="separator"></div>
                <b-btn variant="transparent" @click.stop="setZoom(-.1)"><i class="far fa-search-minus"></i></b-btn>
                <div class="zoom">{{Math.round(zoom * 100)}}%</div>
                <b-btn variant="transparent" @click.stop="setZoom(.1)"><i class="far fa-search-plus"></i></b-btn>

                <template v-if="!isMobile">
                    <div class="separator"></div>
                    <b-input v-if="project" class="project-name" v-model="project.name"></b-input>
                </template>
            </template>

            <template v-if="!isMobile">
                <b-navbar-brand class="ml-auto">String Art Generator</b-navbar-brand>
            </template>
        </b-navbar>
        <template  v-if="project">
            <properties-panel v-model="layerSelected"></properties-panel>
            <main-page>
                <board :zoom="zoom"></board>
            </main-page>
        </template>
        <template v-else>
            <div class="welcome-screen">
                <b-container>
                    <h5 class="">String Art Generator v0.1</h5>
                    <hr>
                    <div class="buttons">
                        <h4 class="text-center">Bienvenue Arianne</h4>
                        <b-btn block @click="newProject" variant="primary">Nouveau projet</b-btn>
                    </div>
                    <div class="previous-projects">
                        <h4 class="text-center">Projets récents</h4>
                        <div class="project-list" v-if="previousProjects && previousProjects.length > 0">
                            <div @click="openProject(project)" class="project" v-for="project in previousProjects" :key="project.id">
                                <div class="date">{{project.date_creation|date}}</div>
                                <div class="name">{{project.name}}</div>
                            </div>
                        </div>
                        <template v-else>
                            <p class="empty text-center">Pas encore de projets récents...</p>
                        </template>
                    </div>
                </b-container>
<!--                        <b-img :src="require('../assets/img/home.jpg')"></b-img>-->
            </div>
        </template>
    </div>
</template>

<script>
import Board from "@/components/board.vue";
import PropertiesPanel from "@/components/properties-panel.vue";
import Project from "@/helpers/Project.js";
import MainPage from "../components/main-page";
import swal from 'sweetalert2'

export default {
    name: "home",
    components: {PropertiesPanel, Board, MainPage},
    data() {
        return {
            zoom: 1,
            showPreviousSessionModal: false,
            previousProjectName: '',
            layerSelected: false,
            menuExtended: false,
            previousProjects: []
        }
    },
    mounted() {
        this.loadRecentProjects();
    },
    methods: {
        loadRecentProjects() {
            let projects = localStorage.getItem('projects');
            if (projects) {
                projects = JSON.parse(projects);
                this.previousProjects = projects;
            }
        },
        newProject() {
            this.project = new Project();
            for (let i = 0; i < 9; i++) {
                this.project.addLayer();
            }
        },
        openProject(project) {
            this.project = new Project();
            this.project.open(project.id);
        },
        async saveAs() {
            const {value: newName} = await swal.fire({
                title: "Nom du projet",
                input: "text",
                inputValue: this.project.name,
                showCancelButton: true
            });
            if (newName) {
                this.project.saveAs(newName);
                this.$bvToast.toast(`${this.project.name} a été enregistré avec succès`, {
                    title: 'Enregistré',
                    autoHideDelay: 5000
                });
            }
        },
        saveOrSaveAs() {
            if (this.project.saved) {
                this.project.save();
                this.$bvToast.toast(`${this.project.name} a été enregistré avec succès`, {
                    title: 'Enregistré',
                    autoHideDelay: 5000
                });
            } else {
                this.saveAs();
            }
        },
        closeProject() {
            this.project = null;
            this.loadRecentProjects();
        },
        setZoom(delta) {
            this.zoom = Math.max(Math.min(this.zoom + delta, 3), 0.1);
        }
    }
}
</script>

<style lang="scss" scoped>
#home {
    padding-right: 270px;

    .navbar.main-menu {
        background: rgba(#374145, 0.85) !important;
        backdrop-filter: blur(5px);
        color: white;
        padding: 0 10px;
        height: 40px !important;

        .navbar-brand {
            margin: 0 15px 0 0;
            color: inherit;
        }

        .separator {
            display: inline-block;
            height: 20px;
            margin: 0 2px;
            border-right: 3px solid rgba(white, 0.2);
        }

        .dropdown ::v-deep {
            .btn.dropdown-toggle {
                background: none;
                color: rgba(white, 0.8);
                height: 40px;
                border-radius: 0;
                border: none;
                font-weight: 400;

                &:hover {
                    color: white;
                    background-color: rgba(white, 0.15);
                }
            }
        }

        .form-control {
            display: inline-block;
            width: auto;
            background: none;
            border: none;
            box-shadow: none;
            color: white;
            border-radius: 0;
            height: 30px;

            &:hover {
                background-color: rgba(white, 0.1);
            }
            &:focus {
                background-color: #2d3539;
            }
        }

        .zoom {
            padding: 5px;
            font-size: 10pt;
            opacity: 0.7;
        }

        .btn {
            color: rgba(white, 0.8);
            height: 40px;
            border-radius: 0;

            &:hover {
                color: white;
                background-color: rgba(white, 0.15);
            }
        }
    }

    .main-page {
        width: calc(100vw - 270px);
        max-height: 100vh;
        overflow: scroll;
    }

    .welcome-screen {
        display: flex;
        margin: 70px 0 0 270px;
        overflow: hidden;

        .buttons {
            display: inline-block;
            width: 200px;
            vertical-align: top;
        }

        .previous-projects {
            display: inline-block;
            vertical-align: top;
            margin-left: 30px;
            width: calc(100% - 230px);
            max-width: 500px;

            .project-list {
                width: 100%;
                background-color: #374145;
                border-radius: 4px;
                overflow: hidden auto;
            }

            .project {
                padding: 10px 15px;
                text-align: left;
                cursor: pointer;
                display: block;

                .name {
                    font-weight: 500;
                }

                .date {
                    float: right;
                    font-weight: 400;
                    opacity: 0.7;
                }

                &:hover {
                    background-color: #3096cf;
                }

                &.project {
                    border-top: 1px solid rgba(black, 0.2);
                }
            }

            .empty {
                margin: 20px;
                opacity: 0.7;
                font-style: italic;
                font-size: 11pt;
            }
        }
    }

    &.draft {
        background: #ddd;

        .main-page {
            background: #fff;
            width: 216mm;
            //height: 279mm;
            padding: 13mm 18mm;
            //overflow: hidden auto;
        }
    }

    @media(max-width: 576px) {
        padding-right: 50px;

        .main-page {
            width: 100vw;
        }
    }
}

</style>
