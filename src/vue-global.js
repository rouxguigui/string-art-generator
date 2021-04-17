import Vue from "vue";

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
        }
    }
});

export default {};
