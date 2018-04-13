// Store.
export interface State {
    token: String,
    loggedUser: UserModel,
    selectedUser: UserModel,
    selectedPost: PostModel
}

export type ROLE = 'ADMIN' | 'USER';

// Models.
export interface UserModel {
    __typename: String,
    id: String,
    username: String,
    email: String,
    role: ROLE,
    avatar: String
}

export interface PostModel {
    __typename: String,
    content: String,
    createdAt: Date,
    id: String,
    updatedAt: Date,
    title: String,
    author: UserModel,
    isPublished: Boolean
}

export interface CategoryModel {
    id: String
    name: String
}