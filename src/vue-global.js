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
        board() {
            if (this.$store.state.project) {
                return this.$store.state.project.board;
            } else {
                return null;
            }
        },
        layers() {
            if (this.$store.state.project) {
                return this.$store.state.project.layers;
            } else {
                return null;
            }
        },
    }
});

export default {};
