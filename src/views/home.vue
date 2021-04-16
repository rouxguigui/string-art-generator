<template>
    <div id="home" v-if="project">
        <b-navbar class="main-menu" variant="dark" fixed="top">
            <b-dropdown text="Menu" no-caret>
                <b-dropdown-item @click="newProject">Nouveau</b-dropdown-item>
                <b-dropdown-item @click="project.load()">Ouvrir</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="project.save()">Enregistrer</b-dropdown-item>
            </b-dropdown>
            <b-btn variant="transparent" @click="setZoom(-.1)"><i class="far fa-search-minus"></i></b-btn>
            <div class="zoom">{{Math.round(zoom * 100)}}%</div>
            <b-btn variant="transparent" @click="setZoom(.1)"><i class="far fa-search-plus"></i></b-btn>
            <div class="separator"></div>
            <b-input class="project-name" v-model="project.name"></b-input>
            <b-navbar-brand class="ml-auto">String Art Generator</b-navbar-brand>
        </b-navbar>
        <properties-panel v-model="layerSelected"></properties-panel>
        <main-page>
            <board :zoom="zoom"></board>
        </main-page>
    </div>
</template>

<script>
import Board from "@/components/board.vue";
import PropertiesPanel from "@/components/properties-panel.vue";
import Project from "@/helpers/Project.js";
import MainPage from "../components/main-page";

export default {
    name: "home",
    components: {PropertiesPanel, Board, MainPage},
    data() {
        return {
            zoom: 1,
            layerSelected: false,
            menuExtended: false,
        }
    },
    mounted() {
        this.newProject();
    },
    methods: {
        newProject() {
            this.project = new Project();
            for (let i = 0; i < 9; i++) {
                this.project.addLayer();
            }
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
                background-color: rgba(white, 0.2);
            }
            &:focus {
                background-color: rgba(white, 0.15);
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

    .properties-panel {
        position: fixed;
        z-index: 1;
        top: 40px;
        right: 0;
        width: 270px;
        bottom: 0;
        flex: 1;
        background: #374145;
        display: flex;
        flex-direction: column;
        overflow: hidden auto;

        .properties-group {
            border-top: 2px solid rgba(black, 0.2);

            padding: 10px 0;
            min-height: 120px;

            h4 {
                font-weight: 400;
                font-size: 10pt;
                letter-spacing: 1px;
                padding: 0 10px;
            }

            .content {
                padding: 0 10px;
            }
        }
    }

    #properties {
        flex: 2;
        overflow: hidden auto;
    }

    .options {
        flex: 0.1;
    }

    #layers {
        flex: 2;
        width: 100%;
        display: flex;
        flex-direction: column;

        .content {
            padding: 0;
            overflow: hidden auto;
            height: 100%;
        }

        .layer {
            padding: 5px 10px;
            width: 100%;
            display: flex;
            flex-direction: row;
            cursor: pointer;
            justify-content: center;

            .visibility {
                margin-right: 10px;
            }

            .name {
                flex: 1;
            }

            &:hover {
                background-color: rgba(white, 0.1);
            }

            &.active {
                background-color: #3096cf;
            }
        }

        .layer + .layer {
            border-top: 1px solid rgba(black, 0.2);
        }
    }

    .main-page {
        width: calc(100vw - 270px);
        max-height: 100vh;
        overflow: scroll;
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

    @media(min-width: 576px) {
        .mobile-controls {
            display: none !important;
        }
    }

    @media(max-width: 576px) {
        padding-right: 50px;


        .main-page {
            width: 100vw;
        }

        .properties-panel {
            &:not(.extended) {
                width: 50px;

                .properties-group {
                    display: none !important;
                }
            }

            &.extended {
                position: fixed;
                width: 100%;

                .mobile-controls {
                    display: none !important;
                }
            }
        }
    }
}

@media print {
    #home {
        padding: 0;

        .main-page {
            padding: 0 !important;
            overflow: visible;
        }
    }
    .properties-panel {
        display: none;
    }
}

</style>
