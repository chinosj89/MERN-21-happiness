const { User } = require('../models');
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
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
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return { token, user };

        },
        saveBook: async (parent, { userId, bookInput }) => {
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { savedBooks: bookInput } },
                { new: true }
            )
            return user
        },
        removeBook: async (parent, { bookId }) => {
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