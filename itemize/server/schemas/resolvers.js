const { AuthenticationError } = require('apollo-server-express');
const { User, Novel, CurrentBook} = require('../models');
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

    currentBooks: async () => {
      try {
        return CurrentBook.find()
      } catch (error) {
        console.log(error)
      }
    },

    currentBook: async () => {
      try{
        return CurrentBook.findOne({_id: currentBookId})
      }catch (error){
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

    // async updateNovel(parent, { novelId, isComplete}, context) {

    //   if (context.user) {
        
    //     const updatedNovel = await Novel.findByIdAndUpdate(
    //       { _id: novelId },
    //       { isComplete },
    //       // { new: true}
    //     );
    //       console.log(updatedNovel);
    //     return updatedNovel;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },





    removeNovel: async (parent, { novelId }, context) => {
      if (context.user) {
        const novel = await Novel.findOneAndDelete({
          _id: novelId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { novels: {_id: novelId }} }
        );

        return novel;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // addNovel: async (parent, { author, name, rank, isComplete }) => {
    //   try {

    //     return Novel.create({
    //       author,
    //       name,
    //       rank,
    //       isComplete
    //     });

    //   } catch (error) {
    //     console.log(error)
    //   }
    // },

    // addNovel: async (parent, {  author, name, rank, isComplete }, context) => {
      
    //   if (context.user) {
    //     const novel = await Novel.create({ author, name, rank, isComplete });
    //     console.log(novel);

    //     await User.findByIdAndUpdate(context.user._id, { $addToSet: { novels: novel } });

    //     return novel;
    //   }

    //   throw new AuthenticationError('Not logged in');
    // },

    addNovel: async (parent, {owner, name, author, rank, isComplete }, context) => {
      if (context.user) {
        const novel = await Novel.create({
          name,
          author,
          rank,
          isComplete,
          owner: context.user.name,
        });
        console.log(owner)
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { novels: novel } }
        );
          console.log(novel)
        return novel;
      }
      throw new AuthenticationError('You need to be logged in!');
    },



    updateNovel: async (parent, { _id, author, name, rank, isComplete }, context) => {
      try {
        const updatedNovel = await Novel.findByIdAndUpdate(
          { _id: _id },
          { isComplete },
          // { new: true }
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
    },
    removeCurrentBook: async (parent, { _id }) => {
      try {
        return CurrentBook.findOneAndDelete(
          { _id: _id },
          // { $pull: { novels: novel } },
          // { new: true }
        );

      } catch (error) {
        console.log(error)
      }
    },

    addCurrentBook: async (parent, { name, totalPages, pagesRead }) => {
      try {

        return CurrentBook.create({
  
          name,
          totalPages,
          pagesRead
        });

      } catch (error) {
        console.log(error)
      }
    },

    updateCurrentBook: async (parent, { _id, name, totalPages, pagesRead }, context) => {
      try {
        const updatedCurrentBook = await CurrentBook.findByIdAndUpdate(
          { _id: _id },
          { pagesRead },
          { new: true }
        );
        console.log(updatedCurrentBook)
        return updatedCurrentBook;

      } catch (error) {
        console.log(error)
      }
    }

  },
};





module.exports = resolvers;
