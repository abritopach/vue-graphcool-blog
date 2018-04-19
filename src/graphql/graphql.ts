import gql from 'graphql-tag'

// QUERIES.

// User.

export const ALL_USERS_QUERY = gql`
    query AllUsersQuery {
        allUsers {
            id
            name
            username
            email
            role
        }
    }
`

export const USER_QUERY = gql`
    query UserQuery($id: ID!) {
        user(id: $id) {
            id
            name
            username
            avatar
            email
            role
            posts {
                id
                title
                content
                likes
                createdAt
                categories {
                    id
                    name
                }
                isPublished
            }
        }
    }
`

export const ME_QUERY = gql`
    query MeQuery {
        me {
            id
            username
            avatar
            email
            role
            posts {
                id
                title
                content
                likes
                createdAt
                categories {
                    id
                    name
                }
                isPublished
            }
        }
    }
`

// Post.

export const POST_QUERY = gql`
    query PostQuery($id: ID!) {
        post(id: $id) {
            id
            title
            image
            content
            categories {
                id
                name
            }
            author {
                id
                username
                email
                avatar
            }
        }
    }
`

export const ALL_POSTS_QUERY = gql`
    query AllPostsQuery($orderBy: PostOrderByInput, $first: Int, $skip: Int, $filter: PostWhereInput) {
        allPosts(orderBy: $orderBy, first: $first, skip: $skip, 
            filter: $filter) {
            id
            title
            createdAt
            content
            image
            likes
            author {
                id
                username
                name
                avatar
            }
            categories {
                id
                name
            }
            isPublished
        }
    }
`

export const POSTS_COUNT_QUERY = gql`
    query PostsCountQuery {
        _allPostsMeta {
            count
        }
    }
`

// Category

export const ALL_CATEGORIES_QUERY = gql`
    query AllUsersQuery {
        allCategories {
            id
            name
        }
    }
`

// *********************

// MUTATIONS.

// User.

/*
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
*/

export const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $password: String!, $name: String!, $username: String!) {
        signup(
            email: $email
            password: $password
            name: $name
            username: $username
        ) {
            token
            user {
                id
            }
        }
    }
`

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(
            email: $email
            password: $password 
        ) {
            token
            user {
                id
                username
                email
                role
                avatar
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

export const MARK_AS_DELETED_USER_MUTATION = gql`
    mutation MarkAsDeletedUserMutation($id:ID!, $toDelete: Boolean!) {
        updateUser(
            id: $id
            toDelete: $toDelete
        ) {
            id
        }
    }
`

export const UPDATE_USER_MUTATION = gql`
    mutation UpdateUserMutation($id: ID!, $username: String, $role: String, $avatar: String) {
        updateUser(
            id: $id
            username: $username
            role: $role
            avatar: $avatar
        ) {
            id
            username
            email
            role
            avatar
        }
    }
`

export const FORGOT_PASSWORD_MUTATION = gql`
    mutation ForgotPasswordMutation($email: String!) {
        triggerPasswordReset(email: $email) {
            id
        }
    }
`

export const RESET_PASSWORD_MUTATION = gql`
    mutation ResetPasswordMutation($resetToken: String!, $password: String!, $newPassword: String!) {
        resetPassword(resetToken: $resetToken, password: $password, newPassword: $newPassword) {
            id
        }
    }
`

// Post.

export const ADD_POST_MUTATION = gql`
    mutation AddPostMutation($title: String!, $content: String!, $image: String, $categories: [CategoryWhereInput!],
    $isPublished: Boolean!) {
        createPost(
            title: $title
            content: $content
            image: $image
            categories: $categories
            isPublished: $isPublished
        ) {
            id
            title
            content
            image
            likes
            createdAt
            isPublished
            categories {
                id
                name
            }
            author {
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
    mutation UpdatePostMutation($id:ID!, $title: String, $content: String, $image: String, $likes: Int, $categories: [CategoryWhereInput!], $isPublished: Boolean) {
        updatePost(
            id: $id
            title: $title
            content: $content
            image: $image
            likes: $likes
            categories: $categories
            isPublished: $isPublished
        ) {
            id
            title
            content
            createdAt
            author {
                id
                username
            }
            categories {
                id
                name
            }
            isPublished
        }
    }
`

// ********************

/*
Subscription query that we’ll run to automatically receive new item created, updated and deleted on the server.
*/

export const POSTS_SUBSCRIPTION = gql`  
    subscription changedPosts {  
        Post(
            filter: {
                mutation_in: [CREATED, UPDATED, DELETED]
            }
        ) {
            mutation
            node {
                id
                title
                createdAt
                content
                image
                likes
                categories {
                    id
                    name
                }
                user {
                    id
                    username
                }
            }
            previousValues {
                id
            }
        }
    }
`;

export const USERS_SUBSCRIPTION = gql`  
    subscription changedUsers {  
        User(
            filter: {
                mutation_in: [CREATED, UPDATED, DELETED]
            }
        ) {
            mutation
            node {
                id
                username
                email
                role
                posts {
                    id
                    title
                    createdAt
                }
            }
            previousValues {
                id
            }
        }
    }
`;

export const DELETE_USER_SUBSCRIPTION = gql`
    subscription deleteUser {
        User(
            filter: {
                mutation_in: [UPDATED]
                updatedFields_contains_some: ["toDelete"]
            }
        ) {
            updatedFields
            node {
                id
                posts {
                    id
                }
            }
        }
    }
`;

export function subscribeToPostsChanges(apollo: any) {
    return apollo.queries.allPosts.subscribeToMore({
        // GraphQL document.
        document: POSTS_SUBSCRIPTION,
        // Mutate the previous result.
        updateQuery: (previousResult: any, { subscriptionData } : any) => {
            // Here, return the new result from the previous with the new data.
            // console.log('previousResult', previousResult);
            if (!subscriptionData.data) {
                return previousResult;
            }

            console.log('subscriptionData', subscriptionData);

            if (subscriptionData.data.Post.mutation == 'CREATED') {
                console.log("CREATED NEW POST");
                return Object.assign({}, previousResult, {
                    allPosts: previousResult['allPosts'].concat(subscriptionData.data.Post.node)
                });
            }
            else if (subscriptionData.data.Post.mutation == 'DELETED') {
                console.log("DELETED POST");
                return Object.assign({}, previousResult, {
                    allPosts: previousResult['allPosts'].filter((i: any) => i.id !== subscriptionData.data.Post.previousValues.id)
                });
            }
        },
    })
}

export function subscribeToUsersChanges(apollo: any) {
    return apollo.queries.allUsers.subscribeToMore({
        // GraphQL document.
        document: USERS_SUBSCRIPTION,
        // Mutate the previous result.
        updateQuery: (previousResult: any, { subscriptionData } : any) => {
            // Here, return the new result from the previous with the new data.
            // console.log('previousResult', previousResult);
            if (!subscriptionData.data) {
                return previousResult;
            }

            // console.log('subscriptionData', subscriptionData);

            if (subscriptionData.data.User.mutation == 'CREATED') {
                console.log("CREATED NEW USER");
                return Object.assign({}, previousResult, {
                    allUsers: previousResult['allUsers'].concat(subscriptionData.data.User.node)
                });
            }
            else if (subscriptionData.data.User.mutation == 'DELETED') {
                console.log("DELETED USER");
                return Object.assign({}, previousResult, {
                    allUsers: previousResult['allUsers'].filter((i: any) => i.id !== subscriptionData.data.User.previousValues.id)
                });
            }
        },
    })
}