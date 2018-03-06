import { GetterTree, ActionTree, MutationTree, Mutation } from 'vuex';
import { State, UserModel } from '../types';

const state: State = {
    token: '',
    user: new UserModel('', '', '', '', 'user'),
    selectedUser: new UserModel('', '', '', '', 'user')
}

const getters: GetterTree<State, any> = {
    currentUser: state => state.user,
    selectedUser: state => state.selectedUser
}

const actions: ActionTree<State, any> = {
    LOGGED_USER: function({commit}, {data}) {
        // console.log(data);
        commit("LOGGED_USER_MUTATION", {data: data});
    },
    SELECTED_USER: function({commit}, {data}) {
        console.log(data);
        commit("SELECTED_USER_MUTATION", {data: data});
    },
}

const mutations: MutationTree<State> = {
    LOGGED_USER_MUTATION(state, payload) {
        // console.log("payload", payload);
        state.user = {... payload.data.user}
        state.token = payload.data.token
    },
    SELECTED_USER_MUTATION(state, payload) {
        console.log("payload", payload);
        state.selectedUser = {... payload.data}
    },
}

export const blog = {
    state,
    getters,
    actions, 
    mutations
} 