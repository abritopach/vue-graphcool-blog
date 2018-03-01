import gql from 'graphql-tag'

// QUERIES

export const ALL_USERS_QUERY = gql`
    query AllUsersQuery {
        allUsers {
            id
            username
            email
        }
    }
`

export const USER_QUERY = gql`
    query UserQuery($id: Int!) {
        user(id: $id) {
            id
            username
            email
            posts {
                id
            }
        }
    }
`

// MUTATIONS.

export const SIGNUP_MUTATION = gql`
    mutation SignupMutation($username: String!, $email: String!, $password: String!) {
        createUser(
            authProvider: { 
                email: { 
                    email: $email, 
                    password: $password
                } 
            },
            username: $username
        ) {
            id
        }
    }
`

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        signinUser(
            email: { 
                email: $email, 
                password: $password 
            }
        ) {
            token
        }
    }
`