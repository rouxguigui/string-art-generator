<template>
    <b-modal v-model="visible" size="lg" title="Color Palette" hide-footer hide-backdrop>
        <b-row>
            <b-col>
<!--                <b-tabs>-->
<!--                    <b-tab title="Gutermann">-->
                        <div class="palette" style="width: 500px;">
                            <div class="column" v-for="(column, index) in PaletteHelper.gutermannPalette" :key="'column' + index">
                                <div class="color" v-for="color in column" :key="color" @click="$emit('input', color.color)"
                                     :title="color.name"
                                     :style="{backgroundColor: color.color}" :class="{'active': color.color === value}"></div>
                            </div>
                        </div>
<!--                    </b-tab>-->
<!--                    <b-tab title="Standard">-->
<!--                        <div class="palette">-->
<!--                            <div class="color" v-for="color in PaletteHelper.currentPalette" :key="color" @click="$emit('input', color)"-->
<!--                                 :style="{backgroundColor: color}" :class="{'active': color === value}"></div>-->
<!--                        </div>-->
<!--                    </b-tab>-->
<!--                </b-tabs>-->
            </b-col>
            <b-col cols="4" lg="3">
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
            originalColor: null,
            PaletteHelper
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
    //zoom: 2;

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
