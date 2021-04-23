import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        project: null,
        settings: {
            showCenter: false,
            middleLines: false,
            diagonalLines: false,
            nailNumbers: false,
            printMode: false
        },
        recordLayerPattern: false,
        mobilePropertiesExtended: false
    },
    getters: {
    },
    mutations: {
        setProject(state, project) {
            state.project = project;
        },
        setRecordLayerPattern(state, recordLayerPattern) {
            state.recordLayerPattern = recordLayerPattern;
        },
        setSettings(state, settings) {
            state.settings = settings;
        }
    },
    actions: {
        // logout({commit, dispatch}) {
        //     return new Promise((resolve, reject) => {
        //         commit(`loggedOut`);
        //         localStorage.removeItem(`token`);
        //         Network.removeToken();
        //         resolve();
        //     });
        // }
    }
})
