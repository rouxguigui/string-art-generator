<template>
    <div class="properties-panel" :class="{'extended' : $store.state.mobilePropertiesExtended}">
        <b-btn size="sm" v-if="menuExtended" class="float-right" variant="primary"
               @click="$store.state.mobilePropertiesExtended = false"><i
                class="far fa-arrow-right"></i></b-btn>
        <div v-if="!isMobile || $store.state.mobilePropertiesExtended" id="properties" class="properties-group">
            <template v-if="!layerSelected">
                <div class="tabs">
                    <b-btn variant="tab" :class="{'active': tabSelected === 'board'}" @click="tabSelected = 'board'">Plateau</b-btn>
                    <b-btn variant="tab" :class="{'active': tabSelected === 'shape'}" @click="tabSelected = 'shape'">Forme</b-btn>
                    <b-btn variant="tab" :class="{'active': tabSelected === 'nails'}" @click="tabSelected = 'nails'">Clous</b-btn>
                </div>
                <div v-if="tabSelected === 'board'" class="content">
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Fond</b-input-group-text>
                            <b-input type="text" maxlength="7" v-model="board.backgroundColor"></b-input>
                            <b-input type="color" class="ml-1" v-model="board.backgroundColor"></b-input>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Taille (cm)</b-input-group-text>
                            <b-input type="number" min="1" max="150" step="1" v-model.number="board.width"></b-input>
                            <b-input-group-text class="mx-2">x</b-input-group-text>
                            <b-input type="number" min="1" max="150" step="1" v-model.number="board.height"></b-input>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Taille fils</b-input-group-text>
                            <b-input type="number" min="0.1" max="5" step="0.1" v-model.number="board.strings.width"></b-input>
                            <b-input-group-text class="pl-2">px</b-input-group-text>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Qualité</b-input-group-text>
                            <b-select v-model.number="board.resolution">
                                <option v-for="i in 300" :value="i + 1" :key="'resolution-' + i">{{ i + 1 }}</option>
                            </b-select>
                            <b-input-group-text class="pl-2">dpi</b-input-group-text>
                        </b-input-group>
                    </b-form-group>
                </div>

                <div v-if="tabSelected === 'shape'" class="content">
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
                            <b-input-group-text>Rayon</b-input-group-text>
                            <b-input type="number" min="1" max="150" step="1" v-model.number="board.radius"></b-input>
                            <b-input-group-text class="pl-2">cm</b-input-group-text>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Espacement</b-input-group-text>
                            <b-select v-model.number="board.nailsBetweenLayers">
                                <option value="-1">Automatique</option>
                                <option v-for="i in 150" :value="i + 1" :key="'resolution-' + i">{{ i + 1 }} clous</option>
                            </b-select>
                        </b-input-group>
                    </b-form-group>
                    <div class="f-10 f-500 mb-2 text-right text-light" v-if="board.nailsBetweenLayers === -1">
                        Calculé {{roundTo1(project.getAutoNailsBetweenLayers())}} clous
                    </div>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Angle départ</b-input-group-text>
                            <b-input type="number" min="0" max="360" step="15" v-model.number="board.startingAngle"></b-input>
                            <b-input-group-text class="pl-2">°</b-input-group-text>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Sens horaire</b-input-group-text>
                            <b-checkbox v-model="board.clockwise"></b-checkbox>
                        </b-input-group>
                    </b-form-group>
                </div>

                <div v-if="tabSelected === 'nails'" class="content">
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Nombre</b-input-group-text>
                            <b-input type="number" min="1" max="999" step="10" v-model.number="board.nails.quantity"></b-input>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Diamètre</b-input-group-text>
                            <b-input type="number" min="0.5" max="25" step="0.25" v-model.number="board.nails.radius"></b-input>
                            <b-input-group-text class="pl-2">mm</b-input-group-text>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Couleur</b-input-group-text>
                            <b-input type="text" maxlength="7" v-model="board.nails.color"></b-input>
                            <b-input type="color" class="ml-1" v-model="board.nails.color"></b-input>
                        </b-input-group>
                    </b-form-group>
                </div>
            </template>

            <div class="content" v-if="layerSelected">

                <div class="tabs">
                    <b-btn variant="tab" :class="{'active': stringTab === 'string'}" @click="stringTab = 'string'">Fil</b-btn>
                    <b-btn variant="tab" :class="{'active': stringTab === 'pattern'}" @click="stringTab = 'pattern'">Motif</b-btn>
                </div>
                <template v-if="stringTab === 'string'">
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
                        <b-input-group class="mt-1">
                            <b-btn variant="default" class="mr-1" @click="$refs.colorPalette.show()"><i class="far fa-palette"></i></b-btn>
                            <b-input type="number" min="0" max="360" @change="updateLayerColorHSL" v-model.number="layerColorHSL[0]"></b-input>
                            <b-input-group-text class="px-1">°</b-input-group-text>
                            <b-input type="number" min="0" max="100" @change="updateLayerColorHSL" v-model.number="layerColorHSL[1]"></b-input>
                            <b-input-group-text class="px-1">%</b-input-group-text>
                            <b-input type="number" min="0" max="100" @change="updateLayerColorHSL" v-model.number="layerColorHSL[2]"></b-input>
                            <b-input-group-text class="pl-1">%</b-input-group-text>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Longueur</b-input-group-text>
                            <b-input readonly :value="layerSelected.length|number"></b-input>
                            <b-input-group-text class="pl-2">m</b-input-group-text>
                        </b-input-group>
                    </b-form-group>
                </template>

                <template v-if="stringTab === 'pattern'">
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Type</b-input-group-text>
                            <b-select v-model="layerSelected.pattern">
                                <option value="default">Défaut</option>
                                <option value="custom">Personnalisé</option>
                            </b-select>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>1er clou</b-input-group-text>
                            <b-select v-model.number="layerSelected.startingNail">
                                <option value="auto">Automatique</option>
                                <option value="0">Clou 1</option>
                                <option v-for="i in 150" :value="i" :key="'start-' + i">Clou {{ i + 1 }}</option>
                            </b-select>
                        </b-input-group>
                    </b-form-group>
                    <template v-if="layerSelected.pattern === 'custom'">
                        <b-form-group class="property">
                            <b-input-group>
                                <b-input-group-text>Actions</b-input-group-text>
                                <b-btn size="sm" :variant="recordLayerPattern ? 'danger' : 'default'" @click="startPatternRecord"
                                       :class="recordLayerPattern ? '' : 'text-danger'" title="Enregistrer un motif">⬤ <span v-if="recordLayerPattern">Appliquer</span></b-btn>
                                <template v-if="!recordLayerPattern">
                                    <b-btn size="sm" class="ml-2" @click="addPatternStep()" variant="default" title="Ajouter une étape"><i class="far fa-plus-square"></i></b-btn>
                                    <b-btn size="sm" class="ml-auto" variant="default" title="Appliquer ce motif à tous les calques"><i class="far fa-share-square"></i></b-btn>
                                </template>
                            </b-input-group>
                        </b-form-group>
                        <hr>
                        <h4>Étapes</h4>
                        <b-form-group class="property" v-for="(step, index) in layerSelected.patternSteps" :key="'step-' + index">
                            <b-input-group v-if="recordLayerPattern">
                                <b-input-group-text>Clou {{index+1}}</b-input-group-text>
                                <b-input v-model="step.nail"></b-input>
                                <b-btn size="sm" class="ml-2" @click="removePatternStep(index)" variant="default" title="Enlever cette étape"><i class="far fa-trash"></i></b-btn>
                            </b-input-group>
                            <b-input-group v-else>
                                <b-input-group-text>Étape {{index+1}}</b-input-group-text>
                                <b-input v-model="step.delta"></b-input>
                                <b-btn size="sm" class="ml-2" @click="removePatternStep(index)" variant="default" title="Enlever cette étape"><i class="far fa-trash"></i></b-btn>
                            </b-input-group>
                        </b-form-group>
                    </template>
                </template>
            </div>
        </div>

        <div id="layers" class="properties-group">
            <h4>Calques</h4>
            <div class="content">
                <div class="layer" @click="layerSelected = null" :class="{ 'active': !layerSelected }">
                    <div class="visibility"><i class="far fa-game-board-alt"></i></div>
                    <div class="name">Plateau</div>
                </div>
                <draggable v-model="layers" :handle="isMobile || isMobileLandscape ? '.handle': null" ghost-class="list-item-ghost" drag-class="list-item-drag" animation="150">
                    <div class="layer" v-for="layer in layers" :key="layer.id"
                         @click="layerSelected = layer"
                         :class="{ 'active': layerSelected === layer }">
                        <div v-if="isMobile || isMobileLandscape" class="handle">
                            <i class="far fa-bars mr-2"></i>
                        </div>
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
                </draggable>
            </div>
            <div class="actions">
                <b-btn @click="addLayer"><i class="far fa-layer-plus"></i></b-btn>
                <b-btn class="ml-auto" :disabled="layerSelected === null" @click="removeLayer">
                    <i class="far fa-trash"></i>
                </b-btn>
            </div>
        </div>

        <color-palette ref="colorPalette" v-if="layerSelected" v-model="layerSelected.color"></color-palette>
    </div>
</template>

<script>
import ColorPalette from "@/components/color-palette.vue";
import colorConvert from "color-convert";

export default {
    name: "properties-panel",
    components: {ColorPalette},
    data() {
        return {
            tabSelected: 'board',
            stringTab: 'string',
            showColorPalette: false,
            menuExtended: false
        }
    },
    computed: {
        layerSelected: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit(`input`, value);
                if (!value && this.recordLayerPattern) {
                    this.$store.commit('setRecordLayerPattern', false);
                }
            }
        },
        layerColorHSL: {
            get() {
                if (this.layerSelected) {
                    return colorConvert.hex.hsl(this.layerSelected.color);
                } else {
                    return null;
                }
            },
            set(value) {
                if (this.layerSelected) {
                    this.layerSelected.color = '#' + colorConvert.hsl.hex(value);
                }
            }
        }
    },
    props: {
        value: {}
    },
    methods: {
        startPatternRecord() {
            if (this.recordLayerPattern) {
                // Stop
                for (let i = 0; i < this.layerSelected.patternSteps.length - 1; i++) {
                    this.layerSelected.patternSteps[i].delta = this.layerSelected.patternSteps[i + 1].nail - this.layerSelected.patternSteps[i].nail;
                }
                if (this.layerSelected.patternSteps.length > 0) {
                    this.layerSelected.patternSteps.splice(this.layerSelected.patternSteps.length - 1, 1);// Remove last unused step
                }
            } else {
                // Start
                this.layerSelected.patternSteps = [];
            }
            this.recordLayerPattern = !this.recordLayerPattern;
        },
        addPatternStep() {
            this.layerSelected.patternSteps.push({
                nail: 0,
                delta: 0
            });
        },
        removePatternStep(index) {
            this.layerSelected.patternSteps.splice(index, 1);
        },
        addLayer() {
            let layer = this.project.addLayer();
            this.layerSelected = layer;
        },
        removeLayer() {
            if (!this.layerSelected) {
                return false;
            }
            this.project.removeLayer(this.layerSelected);
            this.layerSelected = null;
        },
        updateLayerColorHSL() {
            this.layerSelected.color = '#' + colorConvert.hsl.hex(this.layerColorHSL);
        },
        roundTo1(value) {
            return Math.round(value * 10) / 10;
        }
    }
}
</script>

<style lang="scss" scoped>
#home {
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

            padding: 10px 0 0;
            min-height: 120px;

            .btn.btn-tab,
            h4 {
                font-weight: 400;
                font-size: 10pt;
                letter-spacing: 1px;
                padding: 0 10px;
                margin-bottom: 5px;
            }

            .btn-tab {
                text-transform: uppercase;
                color: rgba(white, 0.7);
                border-bottom: 3px solid transparent;
                border-radius: 0;

                &:hover {
                    color: white;
                }

                &.active {
                    color: white;
                    border-bottom-color: #3096cf;
                }
            }

            .content {
                padding: 0 10px;
            }

            hr {
                margin: 10px 0;
                border-top: 1px solid #292e30;
            }

            .actions {
                border-top: 2px solid #292e30;
                background-color: #374145;
                padding: 0;
                width: 100%;
                display: flex;
                flex-direction: row;

                .btn {
                    vertical-align: top;
                    background: none;
                    padding: 0;
                    width: 32px;
                    height: 32px;
                    border-radius: 0;
                    font-weight: 400;

                    &:hover {
                        background: #3096cf;
                    }
                }
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
        flex: 3;
        width: 100%;
        display: flex;
        flex-direction: column;
        user-select: none;

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

    @media(max-width: 576px) {
        .properties-panel {
            &:not(.extended) {
                display: none;
            }

            &.extended {
                display: block;
                position: fixed;
                width: 100%;
                z-index: 111;
            }
        }
    }
}
</style>
