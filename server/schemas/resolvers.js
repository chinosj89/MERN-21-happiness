const { User, Book } = require('../models');
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
        // implement context learned from Stu-22-review
        saveBook: async (parent, { bookInput }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookInput } },
                    { new: true }
                ).populate("savedBooks");
                console.log("Book Input: ", bookInput);
                console.log("User's saved books:", updatedUser);
                return updatedUser;
            }
        },
        // implement context learned from Stu-22-review
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                ).populate("savedBooks");

                return updatedUser;
            }
        },
    },
}
module.exports = resolvers;