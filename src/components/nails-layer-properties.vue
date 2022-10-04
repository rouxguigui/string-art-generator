<template>
    <div class="properties">
        <div class="tabs">
            <b-btn variant="tab" :class="{'active': tabSelected === 'nails'}" @click="tabSelected = 'nails'">Clous</b-btn>
            <b-btn variant="tab" :class="{'active': tabSelected === 'shape'}" @click="tabSelected = 'shape'">Forme</b-btn>
        </div>
        <div v-if="tabSelected === 'nails'" class="content">
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Nom</b-input-group-text>
                    <b-input type="text" v-model="layerSelected.name"></b-input>
                </b-input-group>
            </b-form-group>
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Quantité</b-input-group-text>
                    <b-input type="number" min="1" max="999" step="10" v-model.number="layerSelected.settings.nails.quantity" @change="layerSelected.updateDistanceBetweenNails()"></b-input>
                </b-input-group>
            </b-form-group>
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text title="Distance entre les clous">Dist. entre</b-input-group-text>
                    <b-input type="number" min="1" max="999" step="1" v-model.number="layerSelected.settings.nails.distanceBetweenNails" @change="layerSelected.updateNailsQuantity()"></b-input>
                    <b-input-group-text class="pl-2">{{ board.unit }}</b-input-group-text>
                </b-input-group>
            </b-form-group>
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Diamètre</b-input-group-text>
                    <b-input type="number" min="0.5" max="25" step="0.25" v-model.number="layerSelected.settings.nails.radius"></b-input>
                    <b-input-group-text class="pl-2">{{ board.unit }}</b-input-group-text>
                </b-input-group>
            </b-form-group>
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Couleur</b-input-group-text>
                    <b-input type="text" maxlength="7" v-model="layerSelected.settings.nails.color"></b-input>
                    <b-input type="color" class="ml-1" v-model="layerSelected.settings.nails.color"></b-input>
                </b-input-group>
            </b-form-group>
        </div>

        <div v-if="tabSelected === 'shape'" class="content">
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Forme de base</b-input-group-text>
                    <b-select v-model="layerSelected.settings.shape">
                        <option value="circle">Cercle</option>
                        <option value="rectangle">Rectangle</option>
                        <option value="line">Ligne</option>
                        <option value="manual">Manuel</option>
                    </b-select>
                </b-input-group>
            </b-form-group>
            <template v-if="layerSelected.settings.shape === `circle`">
                <b-form-group class="property">
                    <b-input-group>
                        <b-input-group-text title="Point central">Centre ({{ board.unit }})</b-input-group-text>
                        <b-input type="number" min="0" max="99999" step="10" v-model.number="layerSelected.settings.circle.center.x"></b-input>
                        <b-input-group-text class="mx-2">x</b-input-group-text>
                        <b-input type="number" min="0" max="99999" step="10" v-model.number="layerSelected.settings.circle.center.y"></b-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group class="property">
                    <b-input-group>
                        <b-input-group-text>Rayon</b-input-group-text>
                        <b-input type="number" min="1" max="150" step="1" v-model.number="layerSelected.settings.circle.radius"></b-input>
                        <b-input-group-text class="pl-2">{{ board.unit }}</b-input-group-text>
                    </b-input-group>
                </b-form-group>
                <b-form-group class="property">
                    <b-input-group>
                        <b-input-group-text>Angle départ</b-input-group-text>
                        <b-input type="number" min="0" max="360" step="15" v-model.number="layerSelected.settings.circle.startingAngle"></b-input>
                        <b-input-group-text class="pl-2">°</b-input-group-text>
                    </b-input-group>
                </b-form-group>
                <b-form-group class="property">
                    <b-input-group>
                        <b-input-group-text>Sens horaire</b-input-group-text>
                        <b-checkbox v-model="layerSelected.settings.circle.clockwise"></b-checkbox>
                    </b-input-group>
                </b-form-group>
            </template>
            <template v-else-if="layerSelected.settings.shape === `rectangle`">
                <b-form-group class="property">
                    <b-input-group>
                        <b-input-group-text title="Coin en haut à gauche">Origine ({{ board.unit }})</b-input-group-text>
                        <b-input type="number" min="0" max="99999" step="10" v-model.number="layerSelected.settings.rectangle.origin.x"></b-input>
                        <b-input-group-text class="mx-2">x</b-input-group-text>
                        <b-input type="number" min="0" max="99999" step="10" v-model.number="layerSelected.settings.rectangle.origin.y"></b-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group class="property">
                    <b-input-group>
                        <b-input-group-text>Taille ({{ board.unit }})</b-input-group-text>
                        <b-input type="number" min="1" max="9999" step="10" v-model.number="layerSelected.settings.rectangle.width"></b-input>
                        <b-input-group-text class="mx-2">x</b-input-group-text>
                        <b-input type="number" min="1" max="9999" step="10" v-model.number="layerSelected.settings.rectangle.height"></b-input>
                    </b-input-group>
                </b-form-group>
            </template>
            <template v-else-if="layerSelected.settings.shape === `line`">
                <b-form-group class="property">
                    <b-input-group>
                        <b-input-group-text title="Point de départ du segment">Début ({{ board.unit }})</b-input-group-text>
                        <b-input type="number" min="0" max="99999" step="10" v-model.number="layerSelected.settings.line.start.x"></b-input>
                        <b-input-group-text class="mx-2">x</b-input-group-text>
                        <b-input type="number" min="0" max="99999" step="10" v-model.number="layerSelected.settings.line.start.y"></b-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group class="property">
                    <b-input-group>
                        <b-input-group-text title="Point d'arrivée du segment">Fin ({{ board.unit }})</b-input-group-text>
                        <b-input type="number" min="1" max="9999" step="10" v-model.number="layerSelected.settings.line.end.x"></b-input>
                        <b-input-group-text class="mx-2">x</b-input-group-text>
                        <b-input type="number" min="1" max="9999" step="10" v-model.number="layerSelected.settings.line.end.y"></b-input>
                    </b-input-group>
                </b-form-group>
            </template>
        </div>
    </div>
</template>

<script>
import {roundTo1} from "@/utils.js";

export default {
    name: "nails-layer-properties",
    data() {
        return {
            roundTo1,
            tabSelected: 'nails'
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
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
</style>
