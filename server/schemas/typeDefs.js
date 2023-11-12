const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    savedBooks: [Book]!
}
type Book {
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
}

type Query {
    getSingleUser (_id: ID): [User]!
}

type Mutation {
    login (email: String!, password: String!): Auth
    createUser (username: String!, email: String!, password: String!)
    saveBook (title: String!, authors:[String], description: String! ): User
    deleteBook (bookId: ID!): User
}
`


module.exports = typeDefs;