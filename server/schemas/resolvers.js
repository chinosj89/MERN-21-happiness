const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args) => {
            const user = await User.findOne(args)
            return user
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            return user
        },
        saveBook: async (parent, { userId, bookInput }) => {
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { savedBooks: bookInput } },
                { new: true }
            )
            return user
        },
        removeBook: async (parent, bookInput) => {
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