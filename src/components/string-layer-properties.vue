<template>
    <div class="properties">
        <div class="tabs">
            <b-btn variant="tab" :class="{'active': tabSelected === 'string'}" @click="tabSelected = 'string'">Fil</b-btn>
            <b-btn variant="tab" :class="{'active': tabSelected === 'pattern'}" @click="tabSelected = 'pattern'">Motif</b-btn>
        </div>
        <div class="content" v-if="tabSelected === 'string'">
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Nom</b-input-group-text>
                    <b-input type="text" v-model="layerSelected.name"></b-input>
                </b-input-group>
            </b-form-group>
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Couleur</b-input-group-text>
                    <b-input type="text" maxlength="7" v-model="layerSelected.settings.color"></b-input>
                    <b-input type="color" class="ml-1" v-model="layerSelected.settings.color"></b-input>
                </b-input-group>
                <b-input-group class="mt-1">
                    <b-btn variant="default" class="mr-1" @click="$refs.colorPalette.show()"><i class="fas fa-palette"></i></b-btn>
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
        </div>

        <div class="content" v-if="tabSelected === 'pattern'">
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Type</b-input-group-text>
                    <b-select v-model="layerSelected.settings.pattern">
                        <option value="default">Aqua</option>
                        <option value="custom">Personnalisé</option>
                    </b-select>
                </b-input-group>
            </b-form-group>
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>1er clou</b-input-group-text>
                    <b-select v-model.number="layerSelected.settings.startingNail">
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
                            <b-btn size="sm" class="ml-2" @click="addPatternStep()" variant="default" title="Ajouter une étape"><i class="fas fa-plus-square"></i></b-btn>
                            <b-btn size="sm" class="ml-auto" variant="default" title="Appliquer ce motif à tous les calques"><i class="fas fa-share-square"></i></b-btn>
                        </template>
                    </b-input-group>
                </b-form-group>
                <hr>
                <h4>Étapes</h4>
                <b-form-group class="property" v-for="(step, index) in layerSelected.patternSteps" :key="'step-' + index">
                    <b-input-group v-if="recordLayerPattern">
                        <b-input-group-text>Clou {{index+1}}</b-input-group-text>
                        <b-input v-model="step.nail"></b-input>
                        <b-btn size="sm" class="ml-2" @click="removePatternStep(index)" variant="default" title="Enlever cette étape"><i class="fas fa-trash"></i></b-btn>
                    </b-input-group>
                    <b-input-group v-else>
                        <b-input-group-text>Étape {{index+1}}</b-input-group-text>
                        <b-input v-model="step.delta"></b-input>
                        <b-btn size="sm" class="ml-2" @click="removePatternStep(index)" variant="default" title="Enlever cette étape"><i class="fas fa-trash"></i></b-btn>
                    </b-input-group>
                </b-form-group>
            </template>
        </div>

        <color-palette ref="colorPalette" v-if="layerSelected" v-model="layerSelected.settings.color"></color-palette>
    </div>
</template>

<script>
import {roundTo1} from "@/utils.js";
import ColorPalette from "@/components/color-palette.vue";
import colorConvert from "color-convert";

export default {
    name: "string-layer-properties",
    components: {ColorPalette},
    data() {
        return {
            roundTo1,
            showColorPalette: false,
            tabSelected: 'string'
        }
    },
    props: {
        value: {}
    },
    computed: {
        layerSelected: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit(`input`, value);
            }
        },
        layerColorHSL: {
            get() {
                if (this.layerSelected) {
                    return colorConvert.hex.hsl(this.layerSelected.settings.color);
                } else {
                    return null;
                }
            },
            set(value) {
                if (this.layerSelected) {
                    this.layerSelected.settings.color = '#' + colorConvert.hsl.hex(value);
                }
            }
        }
    },
    methods: {
        startPatternRecord() {
            if (this.recordLayerPattern) {
                // Stop
                for (let i = 0; i < this.layerSelected.settings.patternSteps.length - 1; i++) {
                    this.layerSelected.settings.patternSteps[i].delta = this.layerSelected.settings.patternSteps[i + 1].nail - this.layerSelected.settings.patternSteps[i].nail;
                }
                if (this.layerSelected.settings.patternSteps.length > 0) {
                    this.layerSelected.settings.patternSteps.splice(this.layerSelected.settings.patternSteps.length - 1, 1);// Remove last unused step
                }
            } else {
                // Start
                this.layerSelected.settings.patternSteps = [];
            }
            this.recordLayerPattern = !this.recordLayerPattern;
        },
        addPatternStep() {
            this.layerSelected.settings.patternSteps.push({
                nail: 0,
                delta: 0
            });
        },
        removePatternStep(index) {
            this.layerSelected.settings.patternSteps.splice(index, 1);
        },
        updateLayerColorHSL() {
            this.layerSelected.settings.color = '#' + colorConvert.hsl.hex(this.layerColorHSL);
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
