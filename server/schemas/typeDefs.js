const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Auth {
  token: String
  user: User
}

type Query {
    me: User
}

type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]!
    bookCount: Int!
}
type Book {
    bookId: String!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
}

input BookInput {
    title: String!
    authors: [String]!
    description: String!
    bookId: String!
    image: String
    link: String
}
type Mutation {
    login (email: String!, password: String!): Auth
    createUser (username: String!, email: String!, password: String!): Auth
    saveBook: (bookInput: BookInput!): User
    deleteBook (bookId: String!): User
}
`


module.exports = typeDefs;