const { AuthenticationError } = require('apollo-server-express');
const { User, Novel } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },


      user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },


    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Make it so a logged in user can only remove a skill from their own profile
    removeNovel: async (parent, { novel }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { novels: novel } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addNovel: async (parent, { author, name, rank, isComplete }, context) => {
      if (context.user) {
        const novel = new Novel ({
          author,
          name,
          rank,
          isComplete
        });
        console.log(novel);
    
        await User.findOneAndUpdate(
        context.user._id, {$push: {novels: novel}});
    
        return novel;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};





module.exports = resolvers;
