// Store.
export interface State {
    token: String,
    user: UserModel,
    selectedUser: UserModel,
    selectedPost: PostModel
}

export type ROLE = 'admin' | 'user';

// Models.
export class UserModel {
    __typename: String;
   id: String;
   username: String;
   email: String;
   role: ROLE;

    constructor(__typename: String, id: String, username: String, email: String, role: ROLE) {
        this.__typename = __typename;
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}

export class PostModel {
    __typename: String;
    content: String;
    createdAt: Date;
    id: String;
    updatedAt: Date;
    title: String;

    constructor(__typename: String, id: String, content: String, createdAt: Date, updatedAt: Date, title: String) {
        this.__typename = __typename;
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.title = title;
    }
}