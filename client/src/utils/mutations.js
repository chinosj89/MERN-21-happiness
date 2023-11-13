import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
        token
        user {
            _id
            username
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        adduser(username: $username, email: $email, password: $password)
        token
        user {
            _id
            username
        }
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook( $book: BookInput!) {
        saveBook (book: $book) {
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`

export const REMOVE_BOOK = gql`
mutation removeBook( $book: BookInput!) {
    removeBook(book: $book) {
        username
        email
        bookCount
        savedBooks {
            bookId
            title
            authors
            description
            image
            link
        }
    }
}
`