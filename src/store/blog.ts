import { GetterTree, ActionTree, MutationTree, Mutation } from 'vuex';
import { State, UserModel, PostModel } from '../types';

const state: State = {
    token: '',
    loggedUser: <UserModel>{},
    selectedUser: <UserModel>{},
    selectedPost: <PostModel>{}
}

const getters: GetterTree<State, any> = {
    token: state => state.token,
    loggedUser: state => state.loggedUser,
    selectedUser: state => state.selectedUser,
    selectedPost: state => state.selectedPost
}

const actions: ActionTree<State, any> = {
    LOGGED_USER: function({commit}, {data}) {
        commit("LOGGED_USER_MUTATION", {data: data});
    },
    SELECTED_USER: function({commit}, {data}) {
        // console.log(data);
        commit("SELECTED_USER_MUTATION", {data: data});
    },
    SELECTED_POST: function({commit}, {data}) {
        // console.log(data);
        commit("SELECTED_POST_MUTATION", {data: data});
    },
    LOGOUT: function({commit}) {
        commit("LOGOUT_MUTATION");
    }
}

const mutations: MutationTree<State> = {
    LOGGED_USER_MUTATION(state, payload) {
        const { user, token } = payload.data;
        state.loggedUser = {...user}
        state.token = token
    },
    SELECTED_USER_MUTATION(state, payload) {
        // console.log("payload", payload);
        state.selectedUser = {... payload.data}
    },
    SELECTED_POST_MUTATION(state, payload) {
        // console.log("payload", payload);
        state.selectedPost = {... payload.data}
    },
    LOGOUT_MUTATION(state) {
        state.token = '';
        state.loggedUser = <UserModel>{};
        state.selectedUser=  <UserModel>{};
        state.selectedPost = <PostModel>{};
    }
}

export const blog = {
    state,
    getters,
    actions, 
    mutations
} 