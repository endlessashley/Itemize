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
        },
       );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { novels: {_id: novelId }} }
        );

        return novel;
      }
      throw new AuthenticationError('You need to be logged in!');
    },


    removeNonfiction: async (parent, { nonfictionId }, context) => {
      if (context.user) {
        const nonfiction = await Nonfiction.findOneAndDelete({
          _id: nonfictionId,
        },
       );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { nonfictions: {_id: nonfictionId }} }
        );

        return nonfiction;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeCurrentBook: async (parent, { currentBookId }, context) => {
      if (context.user) {
        const currentBook = await CurrentBook.findOneAndDelete({
          _id: currentBookId,
        },
       );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { currentBooks: {_id: currentBookId }} }
        );

        return currentBook;
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
        },
        );
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


    addNonfiction: async (parent, { author, name, rank, isComplete }, context) => {
      if (context.user) {
        const nonfiction = await Nonfiction.create({
          name,
          author,
          rank,
          isComplete,
          owner: context.user.name,
        },
       );
        // console.log(owner)
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { nonfictions: nonfiction } }
        );
          console.log(nonfiction)
        return nonfiction;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addCurrentBook: async (parent, { name, totalPages, pagesRead }, context) => {
      if (context.user) {
        const currentBook = await CurrentBook.create({
          name,
          totalPages,
          pagesRead,
          owner: context.user.name,
        },
      );
        // console.log(owner)
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { currentBooks: currentBook } }
        );
          console.log(currentBook)
        return currentBook;
      }
      throw new AuthenticationError('You need to be logged in!');
    },



    updateNovel: async (parent, { _id, author, name, rank, isComplete }, context) => {
      if (context.user) {
        const updatedNovel = await Novel.findByIdAndUpdate(
          { _id: _id },
          { isComplete },
          { new: true }
        );
        console.log(updatedNovel)
        return updatedNovel;

      } throw new AuthenticationError('You need to be logged in!');
    },



    updateNonfiction: async (parent, { _id, author, name, rank, isComplete }, context) => {
      if (context.user) {
        const updatedNonfiction = await Nonfiction.findByIdAndUpdate(
          { _id: _id },
          { isComplete },
          { new: true }
        );
        console.log(updatedNonfiction)
        return updatedNonfiction;

      } 
      throw new AuthenticationError('You need to be logged in!');
    },




    updateCurrentBook: async (parent, { _id, name, totalPages, pagesRead }, context) => {
      if (context.user) {
        const updatedCurrentBook = await CurrentBook.findByIdAndUpdate(
          { _id: _id },
          { pagesRead },
          { new: true }
        );
        console.log(updatedCurrentBook)
        return updatedCurrentBook;

      } throw new AuthenticationError('You need to be logged in!');
    }

  },
};





module.exports = resolvers;
