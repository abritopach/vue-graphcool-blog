// Store.
export interface State {
    token: String,
    loggedUser: UserModel,
    selectedUser: UserModel,
    selectedPost: PostModel
}

export type ROLE = 'admin' | 'user';

// Models.
export interface UserModel {
    __typename: String;
    id: String;
    username: String;
    email: String;
    role: ROLE;
    avatar: String;
}

export interface PostModel {
    __typename: String;
    content: String;
    createdAt: Date;
    id: String;
    updatedAt: Date;
    title: String;
    user: UserModel
}

export interface CategoryModel {
    id: String
    name: String
}