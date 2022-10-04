<template>
    <div class="properties">
        <div class="tabs">
            <b-btn variant="tab" :class="{'active': tabSelected === 'shape'}" @click="tabSelected = 'shape'">Forme</b-btn>
            <b-btn variant="tab" :class="{'active': tabSelected === 'nails'}" @click="tabSelected = 'nails'">Clous</b-btn>
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
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Rayon</b-input-group-text>
                    <b-input type="number" min="1" max="150" step="1" v-model.number="layerSelected.settings.circle.radius"></b-input>
                    <b-input-group-text class="pl-2">{{ board.unit }}</b-input-group-text>
                </b-input-group>
            </b-form-group>
<!--            <b-form-group class="property">-->
<!--                <b-input-group>-->
<!--                    <b-input-group-text>Espacement</b-input-group-text>-->
<!--                    <b-select v-model.number="board.nailsBetweenLayers">-->
<!--                        <option value="-1">Automatique</option>-->
<!--                        <option v-for="i in 150" :value="i + 1" :key="'resolution-' + i">{{ i + 1 }} clous</option>-->
<!--                    </b-select>-->
<!--                </b-input-group>-->
<!--            </b-form-group>-->
<!--            <div class="f-10 f-500 mb-2 text-right text-light" v-if="board.nailsBetweenLayers === -1">-->
<!--                Calculé {{roundTo1(project.getAutoNailsBetweenLayers())}} clous-->
<!--            </div>-->
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
            <hr>
            <h4>Clous</h4>
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Nombre</b-input-group-text>
                    <b-input type="number" min="1" max="999" step="10" v-model.number="layerSelected.settings.nails.quantity"></b-input>
                </b-input-group>
            </b-form-group>
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Diamètre</b-input-group-text>
                    <b-input type="number" min="0.5" max="25" step="0.25" v-model.number="layerSelected.settings.nails.radius"></b-input>
                    <b-input-group-text class="pl-2">mm</b-input-group-text>
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

        <div v-if="tabSelected === 'nails'" class="content">

        </div>
    </div>
</template>

<script>
export default {
    name: "nails-layer-properties",
    data() {
        return {
            tabSelected: 'shape'
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
        roundTo1(value) {
            return Math.round(value * 10) / 10;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
