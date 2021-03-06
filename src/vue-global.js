import Vue from "vue";
import "./vue-filters";

Vue.mixin({
    computed: {
        project: {
            get() {
                return this.$store.state.project;
            },
            set(value) {
                this.$store.commit("setProject", value);
            }
        },
        settings: {
            get() {
                return this.$store.state.settings;
            },
            set(value) {
                this.$store.commit("setSettings", value);
            }
        },
        board: {
            get() {
                if (this.$store.state.project) {
                    return this.$store.state.project.board;
                } else {
                    return null;
                }
            },
            set(value) {
                this.$store.state.project.board = value;
            }
        },
        layers: {
            get() {
                if (this.$store.state.project) {
                    return this.$store.state.project.layers;
                } else {
                    return null;
                }
            },
            set(value) {
                this.$store.state.project.layers = value;
            }
        },
        recordLayerPattern: {
            get() {
                return this.$store.state.recordLayerPattern;
            },
            set(value) {
                this.$store.commit('setRecordLayerPattern', value);
            }
        },
        isMobile() {
            return window.innerWidth < 576;
        },
        isMobileLandscape() {
            return window.innerHeight < 576;
        }
    }
});

export default {};
