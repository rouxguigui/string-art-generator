<template>
    <b-modal v-model="visible" title="Color Palette" hide-footer>
        <b-row>
            <b-col>
                <div class="palette">
                    <div class="color" v-for="color in currentPalette" :key="color" @click="$emit('input', color)"
                         :style="{backgroundColor: color}" :class="{'active': color === value}"></div>
                </div>
            </b-col>
            <b-col cols="4">
                <b-btn block variant="primary" @click="visible = false">Appliquer</b-btn>
                <b-btn class="mt-3" block variant="default" @click="$emit('input', originalColor); visible = false">Annuler</b-btn>

                <b-input type="text" maxlength="7" v-model="value" readonly style="position: absolute; bottom: 0; left: 15px; width: 90px"></b-input>
            </b-col>
        </b-row>
    </b-modal>
</template>

<script>

import PaletteHelper from "@/helpers/PaletteHelper.js";

export default {
    name: 'color-palette',
    props: {
        value: {required: true}
    },
    data() {
        return {
            visible: false,
            originalColor: null
        }
    },
    computed: {
        currentPalette() {
            return PaletteHelper.basicPalette;
        }
    },
    methods: {
        show() {
            this.visible = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.palette {
    width: 215px;
    background-color: rgba(white, 0.1);
    border-radius: 3px;
    padding: 5px 0 0 0;

    .color {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin: 0 0 5px 5px;
        cursor: pointer;
        transition: 150ms;
        vertical-align: top;

        &.active {
            box-shadow: 0 0 0 2px white;
        }

        &:hover {
            transform: scale(1.2);
        }
        &:active {
            transform: scale(0.95);
        }
    }
}
</style>
