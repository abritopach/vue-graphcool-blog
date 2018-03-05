import { GetterTree, ActionTree, MutationTree, Mutation } from 'vuex';
import { State, UserModel } from '../types';

const state: State = {
    token: '',
    user: new UserModel('', '', '', '', 'user')
}

const getters: GetterTree<State, any> = {
    currentUser: state => state.user
}

const actions: ActionTree<State, any> = {
    LOGGED_USER: function({commit}, {user}) {
        commit("LOGGED_USER_MUTATION", {user: user});
    }
}

const mutations: MutationTree<State> = {
    LOGGED_USER_MUTATION(state, payload) {
        console.log("payload", payload);
        state.user = {... payload.user.user}
        state.token = payload.user.token
    },
}

export const blog = {
    state,
    getters,
    actions, 
    mutations
} 