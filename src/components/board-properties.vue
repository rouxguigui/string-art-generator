<template>
    <div class="properties">
        <div class="tabs">
            <b-btn variant="tab" :class="{'active': tabSelected === 'board'}" @click="tabSelected = 'board'">Plateau</b-btn>
        </div>
        <div v-if="tabSelected === 'board'" class="content">
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Forme de base</b-input-group-text>
                    <b-select v-model="board.shape">
                        <option value="rectangle">Rectangle</option>
                        <option value="circle">Cercle</option>
                    </b-select>
                </b-input-group>
            </b-form-group>
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Fond</b-input-group-text>
                    <b-input type="text" maxlength="7" v-model="board.backgroundColor"></b-input>
                    <b-input type="color" class="ml-1" v-model="board.backgroundColor"></b-input>
                </b-input-group>
            </b-form-group>
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Taille ({{ board.unit }})</b-input-group-text>
                    <b-input type="number" min="1" max="150" step="1" v-model.number="board.width"></b-input>
                    <b-input-group-text class="mx-2">x</b-input-group-text>
                    <b-input type="number" min="1" max="150" step="1" v-model.number="board.height"></b-input>
                </b-input-group>
            </b-form-group>
            <b-form-group class="property">
                <b-input-group>
                    <b-input-group-text>Marges ({{ board.unit }})</b-input-group-text>
                    <b-input type="number" min="1" max="150" step="1" v-model.number="board.marginX"></b-input>
                    <b-input-group-text class="mx-2">x</b-input-group-text>
                    <b-input type="number" min="1" max="150" step="1" v-model.number="board.marginY"></b-input>
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
    </div>
</template>

<script>
export default {
    name: "board-properties",
    data() {
        return {
            tabSelected: 'board'
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
