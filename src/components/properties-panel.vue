<template>
    <div class="properties-panel" :class="{'extended' : menuExtended}">
        <b-btn size="sm" v-if="menuExtended" class="float-right" variant="transparent"
               @click="menuExtended = false"><i
                class="fas fa-arrow-right"></i></b-btn>
        <div id="properties" class="properties-group">
            <template v-if="!layerSelected">
                <h4>Document</h4>
                <div class="content">
                    <b-form-group class="property">
                        <b-input-group>
                            <b-input-group-text>Fond</b-input-group-text>
                            <b-input type="text" maxlength="7" v-model="board.backgroundColor"></b-input>
                            <b-input type="color" class="ml-1" v-model="board.backgroundColor"></b-input>
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
                            <b-input-group-text>Taille (cm)</b-input-group-text>
                            <b-input type="number" min="1" max="150" step="1" v-model.number="board.width"></b-input>
                            <b-input-group-text class="mx-2">x</b-input-group-text>
                            <b-input type="number" min="1" max="150" step="1" v-model.number="board.height"></b-input>
                        </b-input-group>
                    </b-form-group>
                </div>
                <hr>

                <h4>Forme</h4>
                <div class="content">
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
                            <b-input-group-text>Clous</b-input-group-text>
                            <b-select v-model.number="board.nails">
                                <option v-for="i in 999" :value="i + 1" :key="'nail-' + i">{{ i + 1 }}</option>
                            </b-select>
                        </b-input-group>
                    </b-form-group>
                </div>
            </template>

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
        </div>

        <div id="layers" class="properties-group">
            <h4>Calques</h4>
            <div class="content">
                <div class="layer" @click="layerSelected = null" :class="{ 'active': layerSelected === null }">
                    <div class="visibility"></div>
                    <div class="name">
                        Board
                    </div>
                </div>
                <draggable v-model="layers" ghost-class="list-item-ghost" drag-class="list-item-drag" animation="150">
                    <div class="layer" v-for="layer in layers" :key="layer.id"
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
                </draggable>
            </div>
            <div class="actions">
                <b-btn @click="addLayer"><i class="far fa-plus-square"></i></b-btn>
                <b-btn class="ml-auto" :disabled="layerSelected === null" @click="removeLayer">
                    <i class="far fa-trash"></i>
                </b-btn>
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
</template>

<script>
export default {
    name: "properties-panel",
    data() {
        return {
        }
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
    props: {
        value: {},
        menuExtended: {type: Boolean}
    },
    methods: {
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

            h4 {
                font-weight: 400;
                font-size: 10pt;
                letter-spacing: 1px;
                padding: 0 10px;
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
                    width: 28px;
                    height: 28px;
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

    @media(min-width: 576px) {
        .mobile-controls {
            display: none !important;
        }
    }

    @media(max-width: 576px) {
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

</style>
