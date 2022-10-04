<template>
    <div class="properties-panel" :class="{'extended' : $store.state.mobilePropertiesExtended}">
        <b-btn size="sm" v-if="menuExtended" class="float-right" variant="primary"
               @click="$store.state.mobilePropertiesExtended = false"><i
                class="fas fa-arrow-right"></i></b-btn>
        <div v-if="!isMobile || $store.state.mobilePropertiesExtended" id="properties" class="properties-group">
            <board-properties v-if="!layerSelected"/>
            <template v-else>
                <nails-layer-properties v-model="layerSelected" v-if="layerSelected.type === `nails`"/>
                <string-layer-properties v-model="layerSelected" v-else-if="layerSelected.type === `string`"/>
            </template>
        </div>

        <div id="layers" class="properties-group">
            <h4>Calques</h4>
            <div class="content">
                <div class="layer" @click="layerSelected = null" :class="{ 'active': !layerSelected }">
                    <div class="visibility"><i class="fas fa-chess-board"></i></div>
                    <div class="name">Plateau</div>
                </div>
                <div class="layer" v-for="layer in nailsLayers" :key="layer.id" @click="layerSelected = layer"
                           :class="{ 'active': layerSelected === layer }">
                    <div v-if="isMobile || isMobileLandscape" class="handle">
                        <i class="fas fa-bars mr-2"></i>
                    </div>
                    <div class="visibility" @click.stop="layer.visible = !layer.visible">
                        <i class="fas fa-eye fa-fw" v-if="layer.visible"></i>
                        <i class="fas fa-eye-slash fa-fw" v-else></i>
                    </div>
                    <div class="name">
                        {{ layer.name }}
                    </div>
                    <div class="color icon">
                        <i class="fas fa-map-pin"/>
                    </div>
                </div>
                <draggable v-model="stringLayers" :handle="isMobile || isMobileLandscape ? '.handle': null" ghost-class="list-item-ghost" drag-class="list-item-drag" animation="150">
                    <div class="layer" v-for="layer in stringLayers" :key="layer.id" @click="layerSelected = layer"
                         :class="{ 'active': layerSelected === layer }">
                        <div v-if="isMobile || isMobileLandscape" class="handle">
                            <i class="fas fa-bars mr-2"></i>
                        </div>
                        <div class="visibility" @click.stop="layer.visible = !layer.visible">
                            <i class="fas fa-eye fa-fw" v-if="layer.visible"></i>
                            <i class="fas fa-eye-slash fa-fw" v-else></i>
                        </div>
                        <div class="name">
                            {{ layer.name }}
                        </div>
                        <div class="color">
                            <i :style="{color: layer.settings.color}">⬤</i>
                        </div>
                    </div>
                </draggable>
            </div>
            <div class="actions">
                <b-btn @click="addLayer" title="Ajouter un fil"><i class="fas fa-layer-plus"/></b-btn>
                <b-btn @click="addNailsLayer" title="Ajouter des clous"><i class="fas fa-map-pin"/></b-btn>
                <b-btn class="ml-auto" :disabled="layerSelected === null" @click="removeLayer">
                    <i class="fas fa-trash"></i>
                </b-btn>
            </div>
        </div>
    </div>
</template>

<script>
import BoardProperties from "@/components/board-properties.vue";
import NailsLayerProperties from "@/components/nails-layer-properties.vue";
import StringLayerProperties from "@/components/string-layer-properties.vue";

export default {
    name: "properties-panel",
    components: {StringLayerProperties, BoardProperties, NailsLayerProperties},
    data() {
        return {
            tabSelected: 'board',
            stringTab: 'string',
            menuExtended: false
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
                if (!value && this.recordLayerPattern) {
                    this.$store.commit('setRecordLayerPattern', false);
                }
            }
        }
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
        addNailsLayer() {
            let layer = this.project.addNailsLayer();
            this.layerSelected = layer;
        },
        removeLayer() {
            if (!this.layerSelected) {
                return false;
            }
            this.project.removeLayer(this.layerSelected);
            this.layerSelected = null;
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

            ::v-deep .btn.btn-tab,
            ::v-deep h4 {
                font-weight: 400;
                font-size: 10pt;
                letter-spacing: 1px;
                padding: 0 10px;
                margin-bottom: 5px;
            }

            ::v-deep .btn-tab {
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

            ::v-deep .content {
                padding: 0 10px;
            }

            ::v-deep hr {
                margin: 10px 0;
                border-top: 1px solid #292e30;
            }

            ::v-deep .actions {
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
        flex: 3;
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

        ::v-deep .content {
            padding: 0;
            overflow: hidden auto;
            height: 100%;
        }

        ::v-deep .layer {
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
