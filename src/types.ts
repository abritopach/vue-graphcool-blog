// Store.
export interface State {
    token: String,
    user: UserModel
}

export type ROLE = 'admin' | 'user';

// Models.
export class UserModel {
    __typename: String = '';
   id: String = '';
   username: String = '';
   email: String = '';
   role: ROLE = 'user';

    constructor(__typename: String, id: String, username: String, email: String, role: ROLE) {
        this.__typename = __typename;
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}