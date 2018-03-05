import gql from 'graphql-tag'

// QUERIES.

// User.

export const ALL_USERS_QUERY = gql`
    query AllUsersQuery {
        allUsers {
            id
            username
            email,
            role
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
                title
                createdAt
            }
        }
    }
`

// Post.

export const POST_QUERY = gql`
    query PostQuery($id: ID!) {
        Post(id: $id) {
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
            createdAt
            content
            user {
                id
                username
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
                    email: $email
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
                email: $email
                password: $password 
            }
        ) {
            token
            user {
                id,
                username
                email
                role
            }
        }
    }
`

export const DELETE_USER_MUTATION = gql`
    mutation DeleteUserMutation($id: ID!) {
        deleteUser(
            id: $id
        ) {
            id
        }
    }
`

export const UPDATE_USER_MUTATION = gql`
    mutation UpdateUserMutation($id:ID!, $username: String!, $role: String!) {
        updateUser(
            id: $id
            username: $username
            role: $role
        ) {
            id
            username
            email
            role
        }
    }
`

// Post.

export const ADD_POST_MUTATION = gql`
    mutation AddPostMutation($title: String!, $content: String!, $userId: ID!) {
        createPost(
            title: $title
            content: $content
            userId: $userId
        ) {
            id
            title
            content
            createdAt
            user {
                id
                username
                email
            }
        }
    }
`

export const DELETE_POST_MUTATION = gql`
    mutation DeletePostMutation($id: ID!) {
        deletePost(
            id: $id
        ) {
            id
        }
    }
`

export const UPDATE_POST_MUTATION = gql`
    mutation UpdatePostMutation($id:ID!, $title: String!, $content: String!) {
        updatePost(
            id: $id
            title: $title
            content: $content
        ) {
            id
            title
            content
            createdAt
            user {
                username
            }
        }
    }
`