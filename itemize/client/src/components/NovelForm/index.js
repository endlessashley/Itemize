import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_NOVEL } from '../../utils/mutations';

import Auth from '../../utils/auth';

export default function NovelForm({ userId }) {
  const [formState, setFormState] = useState({ name: '', author: '', rank: '' });

  const [addNovel, { error }] = useMutation(ADD_NOVEL);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addNovel({
        variables: { userId, ...formState },
      });

      //       setNovel({name: '', author: '', rank: '', completed: ''});
      //     } catch (err) {
      //       console.error(err);
      //     }
      //   };

      // window.location.reload();
      console.log(formState)
      console.log(data)
    } catch (err) {
      console.error(err);
    }
  }

    const handleChange = (event) => {
      const { name, value } = event.target;

      setFormState({
        ...formState,
        [name]: value,
      });
    };

    const handleCompletedClick = () => {
      let complete = !formState.isComplete;
      console.log(complete);
      setFormState({ isComplete: complete});
    }



  //   return (
  //     <div>
  //       <h4>Add a new novel to your list below:</h4>

  //       {Auth.loggedIn() ? (
  //         <form
  //           className="flex-row justify-center justify-space-between-md align-center"
  //           onSubmit={handleFormSubmit}
  //         >
  //           <div className="col-12 col-lg-9">
  //             <input
  //               placeholder="Author"
  //               value={formState.author}
  //               className="form-input w-100"
  //               onChange={handleChange}
  //             />
  //             <input
  //               placeholder="Title"
  //               value={formState.name}
  //               className="form-input w-100"
  //               onChange={handleChange}
  //             />
  //             <input
  //               placeholder="Rank"
  //               value={formState.rank}
  //               className="form-input w-100"
  //               onChange={handleChange}
  //             />
  //           </div>

  //           <div className="col-12 col-lg-3">
  //             <button className="btn btn-info btn-block py-3" type="submit">
  //               Add Novel
  //           </button>
  //           </div>
  //           {error && (
  //             <div className="col-12 my-3 bg-danger text-white p-3">
  //               {error.message}
  //             </div>
  //           )}
  //         </form>
  //       ) : (
  //         <p>
  //           You need to be logged in to endorse skills. Please{' '}
  //           <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
  //         </p>
  //       )}
  //     </div>
  //   );
  // };



// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';

// import { ADD_NOVEL } from '../../utils/mutations';

// const NovelForm = () => {
//   const [formState, setFormState] = useState({
//     name: '',
//     author: '',
//     rank: '',
//   });


  // Set up our mutation with an option to handle errors
  // const [addNovel, { error }] = useMutation(ADD_NOVEL);

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

    // On form submit, perform mutation and pass in form data object as arguments
    // It is important that the object fields are match the defined parameters in `ADD_THOUGHT` mutation
//     try {
//       const { data } = 
//       addNovel({
//         variables: { ...formState },
//       });

//       window.location.reload();
//       console.log(formState)
//       console.log(data)
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };


  return (
    <div>
      <h4>Add a new novel to your list below:</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}>
          <div className="col-12 col-lg-9">
            <input
              name="author"
              placeholder="Author"
              value={formState.author}
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-9">
            <input
              name="name"
              placeholder="Title"
              value={formState.title}
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-9">
            <input
              name="rank"
              placeholder="Rank"
              value={formState.rank}
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>
          <div>
          <label>Completed?   </label>
    <input name="isComplete" type="checkbox" 
    defaultChecked={formState.isComplete} 
    onChange={handleCompletedClick} 
    className="filled-in" id="filled-in-box"/>
  </div>
          <div className="col-12 col-lg-3">
            <button className="btn btn-primary btn-block py-3" type="submit">
              Add Novel
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              Something went wrong...
            </div>
          )}
        </form>
      ) : (<p>
                  You need to be logged in to endorse skills. Please{' '}
                  <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>)

};
</div>
)
}



