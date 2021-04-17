import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        project: null,
        settings: {
            middleLines: false,
            diagonalLines: false,
            nailNumbers: false
        },
        mobilePropertiesExtended: false
    },
    getters: {
    },
    mutations: {
        setProject(state, project) {
            state.project = project;
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
