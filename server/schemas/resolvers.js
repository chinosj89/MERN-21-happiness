const { User } = require('../models');

const resolvers = {
    Query: {
        getSingleUser: async (parent, { _id, username }) => {
            const params = _id ? { _id } : { username };
            return User.findOne(params);
        },
    },
    Mutation: {
        createUser: async (parent, args, context) => {
            const user = await User.create(args);
            return user
        },
        saveBook: async (parent, { userId, bookInput }, context) => {
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { savedBooks: bookInput } },
                { new: true }
            )
            return user
        },
        deleteBook: async (parent, bookInput, context) => {
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