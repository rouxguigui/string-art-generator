<template>
    <b-modal modal-class="color-palette" v-model="visible" title="Color Palette" hide-footer hide-backdrop :size="isListView ? 'lg': 'md'">
        <b-row>
            <b-col>
                <b-tabs :content-class="'view-' + view">
                    <b-tab title="Gutermann">
                        <div class="palette">
                            <div class="column" v-for="(column, index) in PaletteHelper.gutermannPalette" :key="'column' + index">
                                <div class="color" v-for="color in column" :key="color" @click="$emit('input', color.color)"
                                     :title="color.name" :style="{backgroundColor: color.color}"
                                      :class="{'active': color.color === value}">
                                    <span class="name" v-if="isListView">{{color.name}}</span>
                                </div>
                            </div>
                        </div>
                    </b-tab>
                    <b-tab title="Standard">
                        <div class="palette" style="width: 215px">
                            <div class="color" v-for="color in PaletteHelper.basicPalette" :key="color" @click="$emit('input', color)"
                                 :style="{backgroundColor: color}" :class="{'active': color === value}"></div>
                        </div>
                    </b-tab>
                </b-tabs>
            </b-col>
            <b-col cols="12" md="4" lg="3" style="max-width: 250px;">
                <b-btn block variant="primary" @click="visible = false">Appliquer</b-btn>
                <b-btn class="mt-2" block variant="default" @click="cancel">Annuler</b-btn>

                <b-button-group class="mt-2 mb-5">
                    <b-btn variant="default" @click="view = 'default'" :class="{'active': view === 'default'}"><i class="far fa-th"></i></b-btn>
                    <b-btn variant="default" @click="view = 'large'" :class="{'active': view === 'large'}"><i class="far fa-th-large"></i></b-btn>
                    <b-btn variant="default" @click="view = 'list'" :class="{'active': view === 'list'}"><i class="far fa-list-ul"></i></b-btn>
                    <b-btn variant="default" @click="view = 'list-square'" :class="{'active': view === 'list-square'}"><i class="far fa-list"></i></b-btn>
                </b-button-group>

                <b-input type="text" maxlength="7" v-model="inputValue" style="position: absolute; bottom: 0; left: 15px; width: 90px"></b-input>
                <b-input type="text" maxlength="7" v-model="gutermannCode" style="position: absolute; bottom: 0; right: 15px; width: 70px"></b-input>
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
            view: `default`,
            PaletteHelper
        }
    },
    computed: {
        isListView() {
            return this.view === 'list' || this.view === 'list-square';
        },
        inputValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        },
        gutermannCode: {
            get() {
                const color = PaletteHelper.findColor(this.value);
                if (color) {
                    return color.name;
                } else {
                    return `-`;
                }
            },
            set(value) {
                const color = PaletteHelper.getColorByName(value);
                if (color) {
                    this.$emit('input', color.color);
                }
            }
        },
        currentPalette() {
            return PaletteHelper.basicPalette;
        }
    },
    methods: {
        show() {
            this.visible = true;
            this.originalColor = this.value;
        },
        cancel() {
            if (this.originalColor) {
                this.$emit('input', this.originalColor);
            }
            this.visible = false;
        }
    }
}
</script>

<style lang="scss">
@media(min-width: 576px) and (min-height: 576px) {
    .color-palette {
        .modal-dialog {
            position: absolute;
            top: 0;
            left: auto;
            right: 10px !important;
        }
    }
}
</style>
<style lang="scss" scoped>
.palette {
    width: 100%;
    background-color: rgba(white, 0.1);
    border-radius: 3px;
    padding: 5px 0 0 0;
    //zoom: 2;

    .column {
        display: inline-flex;
        flex-direction: column;
        width: 24px;
    }

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

.view-large {
    .palette {
        .color {
            width: 20px;
            height: 20px;
            margin: 0;
            border-radius: 0;
        }
    }
}

.view-list-square,
.view-list {
    .palette {

        .column {
            width: 70px;
        }

        .color {
            display: inline-block;
            width: 65px;
            height: 24px;
            margin: 0 0 3px 3px;
            border-radius: 3px;
            position: relative;

            .name {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                padding: 0 5px;
                border-top-left-radius: inherit;
                border-bottom-left-radius: inherit;
                background-color: rgba(black, 0.2);
                color: #fff;
            }
        }
    }
}

.view-list-square {
    .palette {
        .color {
            margin: 0;
            border-radius: 0;
        }
    }
}
</style>
