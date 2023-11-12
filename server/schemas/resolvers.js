const { User, Book } = require('../models');

const resolvers = {
    Query: {
        getSingleUser: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.findById(params);
        },
    },
    Mutation: {
        createUser: async (parent, args, context) => {
            const user = await User.create(args);
            return user
        },
        saveBook: async (parent, bookId) => {
            const user = await User.findOneAndUpdate(
                { _id: bookId },
                { $push: { savedBooks: { _id: bookId } } },
                { new: true }
            )
        },
        deleteBook: async (parent, bookId) => {
            const user = await User.findOneAndUpdate(
                { _id: bookId },
                { $pull: { savedBooks: { _id: bookId } } },
                { new: true }
            );

            return user;
        },
    },
}
module.exports = resolvers;