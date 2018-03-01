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
    query UserQuery($id: ID!) {
        User(id: $id) {
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

// User.

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

// Post.

export const ADD_POST_MUTATION = gql`
    mutation AddPostMutation($title: String!, $content: String!, $userId: ID!) {
        createPost(
            title: $title,
            content: $content,
            userId: $userId
        ) {
            id
            title
            content
            user {
                id
                username
                email
            }
        }
    }
`

export const ALL_POSTS_QUERY = gql`
    query AllPostsQuery {
        allPosts {
            id
            title
            user {
                username
            }
        }
    }
`