const { AuthenticationError } = require('apollo-server-express');
const { User, Novel} = require('../models');
const {Nonfiction} = require('../models')
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      try {
        return User.find();
      }
      catch (error) {
        console.log(error)
      }
    },

    novels: async () => {
      try {
        return Novel.find()
      } catch (error) {
        console.log(error)
      }
    },

    novel: async (parent, { novelId }) => {
      try {
        return Novel.findOne({ _id: novelId })
      }
      catch (error) {
        console.log(error)
      }
    },

    nonfiction: async () => {
      try{
        return Nonfiction.findOne({_id: nonfictionId})
      }catch (error){
        console.log(error)
      }
    },

    nonfictions: async () => {
      try {
        return Nonfiction.find()
      } catch (error) {
        console.log(error)
      }
    },


    user: async (parent, args, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id)

          return user;
        }
      }
      catch (error) {
        throw new AuthenticationError('Not Logged in')
      }
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      try {
        const user = await User.create({ name, email, password });
        const token = signToken(user);

        return { token, user };
      }
      catch (error) {
        console.log(error)
      }
    },


    login: async (parent, { email, password }) => {
      try {
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
      } catch (error) {
        cosnole.log(error)
      }
    },


    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeUser: async (parent, args, context) => {
      try {
        if (context.user) {
          return User.findOneAndDelete({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
      }
      catch (error) {
        console.log(error)
      }
    },



    // Make it so a logged in user can only remove a skill from their own profile
    removeNovel: async (parent, { _id }) => {
      try {
        return Novel.findOneAndDelete(
          { _id: _id },
          // { $pull: { novels: novel } },
          // { new: true }
        );

      } catch (error) {
        console.log(error)
      }
    },

    addNovel: async (parent, { author, name, rank, isComplete }) => {
      try {

        return Novel.create({
          author,
          name,
          rank,
          isComplete
        });

      } catch (error) {
        console.log(error)
      }
    },

    updateNovel: async (parent, { _id, author, name, rank, isComplete }, context) => {
      try {
        const updatedNovel = await Novel.findByIdAndUpdate(
          { _id: _id },
          { isComplete },
          { new: true }
        );
        console.log(updatedNovel)
        return updatedNovel;

      } catch (error) {
        console.log(error)
      }
    },

    removeNonfiction: async (parent, { _id }) => {
      try {
        return Nonfiction.findOneAndDelete(
          { _id: _id },
          // { $pull: { novels: novel } },
          // { new: true }
        );

      } catch (error) {
        console.log(error)
      }
    },

    addNonfiction: async (parent, { author, name, rank, isComplete }) => {
      try {

        return Nonfiction.create({
          author,
          name,
          rank,
          isComplete
        });

      } catch (error) {
        console.log(error)
      }
    },

    updateNonfiction: async (parent, { _id, author, name, rank, isComplete }, context) => {
      try {
        const updatedNovel = await Nonfiction.findByIdAndUpdate(
          { _id: _id },
          { isComplete },
          { new: true }
        );
        console.log(updatedNonfiction)
        return updatedNonfiction;

      } catch (error) {
        console.log(error)
      }
    }
  },
};





module.exports = resolvers;
