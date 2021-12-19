const { AuthenticationError } = require('apollo-server-express');
const { User, Novel } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    novels: async ()  => {

        return Novel.find()

     
    },

    novel: async (parent, {novelId}) => {
      return Novel.findOne({_id: novelId})
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
    removeNovel: async (parent, {_id}) => {
 
        return Novel.findOneAndDelete(
          { _id: _id },
          // { $pull: { novels: novel } },
          // { new: true }
        );

    },
    addNovel: async (parent, { author, name, rank, isComplete }) => {
     
       return Novel.create ({
          author,
          name,
          rank,
          isComplete
        });

    },
    updateNovel: async (parent, { _id, author, name, rank, isComplete }, context) => {
     
        const updatedNovel = await Novel.findByIdAndUpdate(
          {_id: _id}, 
          {isComplete},
          {new: true}
        );
        console.log(updatedNovel)
        return updatedNovel;
      
    },
  },
};





module.exports = resolvers;
