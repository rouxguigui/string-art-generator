<template>
    <div id="home">
        <b-navbar class="main-menu" variant="dark" fixed="top">
            <b-dropdown text="Menu" no-caret>
                <b-dropdown-item>Nouveau</b-dropdown-item>
                <b-dropdown-item>Ouvrir</b-dropdown-item>
                <b-dropdown-item>Enregistrer</b-dropdown-item>
            </b-dropdown>
            <b-btn variant="transparent" @click="setZoom(-.1)"><i class="far fa-search-minus"></i></b-btn>
            <div class="zoom">{{Math.round(zoom * 100)}}%</div>
            <b-btn variant="transparent" @click="setZoom(.1)"><i class="far fa-search-plus"></i></b-btn>
            <div class="separator"></div>
            <b-input class="project-name" v-model="projectName"></b-input>
            <b-navbar-brand class="ml-auto">String Art Generator</b-navbar-brand>
        </b-navbar>
        <div class="properties-panel" :class="{'extended' : menuExtended}">
            <b-btn size="sm" v-if="menuExtended" class="float-right" variant="transparent"
                   @click="menuExtended = false"><i
                    class="fas fa-arrow-right"></i></b-btn>
            <div id="properties" class="properties-group">
                <h4>Propriétés</h4>
                <div class="content" v-if="layerSelected">
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Nom</b-input-group-text>
                            <b-input type="text" v-model="layerSelected.name"></b-input>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Couleur</b-input-group-text>
                            <b-input type="text" maxlength="7" v-model="layerSelected.color"></b-input>
                            <b-input type="color" class="ml-1" v-model="layerSelected.color"></b-input>
                        </b-input-group>
                    </b-form-group>
                </div>
                <div class="content" v-else>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Forme de base</b-input-group-text>
                            <b-select v-model="board.shape">
                                <option value="circle">Cercle</option>
                            </b-select>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Rayon (cm)</b-input-group-text>
                            <b-input type="number" min="1" max="150" step="1" v-model.number="board.radius"></b-input>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Clous</b-input-group-text>
                            <b-select v-model.number="board.nails">
                                <option v-for="i in 999" :value="i + 1" :key="'nail-' + i">{{ i + 1 }}</option>
                            </b-select>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Taille</b-input-group-text>
                            <b-input type="number" min="1" max="150" step="1" v-model.number="board.width"></b-input>
                            <b-input-group-text class="mx-2">x</b-input-group-text>
                            <b-input type="number" min="1" max="150" step="1" v-model.number="board.height"></b-input>
                        </b-input-group>
                    </b-form-group>
                </div>
            </div>

            <div id="layers" class="properties-group">
                <h4>Couches</h4>
                <div class="content">
                    <div class="layer" @click="layerSelected = null" :class="{ 'active': layerSelected === null }">
                        <div class="visibility"></div>
                        <div class="name">
                            Board
                        </div>
                    </div>
                    <div class="layer" v-for="(layer, index) in layers" :key="'index-' + index"
                         @click="layerSelected = layer"
                         :class="{ 'active': layerSelected === layer }">
                        <div class="visibility" @click.stop="layer.visible = !layer.visible">
                            <i class="far fa-eye fa-fw" v-if="layer.visible"></i>
                            <i class="far fa-eye-slash fa-fw" v-else></i>
                        </div>
                        <div class="name">
                            {{ layer.name }}
                        </div>
                        <div class="color">
                            <i :style="{color: layer.color}">⬤</i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mobile-controls d-flex flex-column h-100 justify-content-end my-2">
                <b-btn size="sm" block variant="outline-white" @click="zoom > 0.1 ? zoom += 0.1 : ''"><i
                        class="far fa-plus"></i></b-btn>
                <b-btn size="sm" block variant="outline-white" @click="zoom < 3 ? zoom -= 0.1 : ''"><i
                        class="far fa-minus"></i>
                </b-btn>
                <b-btn size="sm" block variant="outline-white" @click="menuExtended = true"><i
                        class="far fa-arrow-left"></i>
                </b-btn>
            </div>
        </div>
        <main-page>
            <board :layers="layers" :zoom="zoom" :board="board"></board>
        </main-page>
    </div>
</template>

<script>
import Board from "@/components/board.vue";
import MainPage from "../components/main-page";

export default {
    name: "home",
    components: {Board, MainPage},
    data() {
        return {
            projectName: `My project`,
            board: {
                width: 55.88,
                height: 55.88,
                nails: 320,
                radius: 25,
                resolution: 25,
                shape: `circle`
            },
            zoom: 1,
            layerSelected: false,
            layers: [],
            menuExtended: false,
            defaultPalette: [`#051f24`, `#1d758a`, `#036074`, `#5b93a3`, `#3587a3`, `#3aa1aa`, `#93cccc`, `#8eb1af`, `#88babf`
            ]
        }
    },
    mounted() {
        if (window.innerWidth < 576) {
            this.resolution = 10;
        }
        for (let i = 0; i < 2; i++) {
            this.addLayer();
        }
    },
    methods: {
        addLayer() {
            this.layers.push({
                name: `Fil ${this.layers.length}`,
                color: this.defaultPalette[this.layers.length % this.defaultPalette.length],
                visible: true
            });
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
