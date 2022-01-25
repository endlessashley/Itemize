import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// import { useStoreContext } from "../../utils/GlobalState";

import { ADD_CURRENT_BOOK } from '../../utils/mutations';

import Auth from '../../utils/auth';

function CurrentBookForm(props) {
  // const [state, dispatch] = useStoreContext();
  const [formState, setFormState] = useState({ name: '', totalPages: '', pagesRead: ''});


  const [addCurrentBook, { error }] = useMutation(ADD_CURRENT_BOOK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await addCurrentBook({
        variables: { name: formState.name, totalPages: formState.totalPages, pagesRead: formState.pagesRead },
      });

      window.location.reload();

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




  return (
    <div>
      <h4>Add a new current book to your list below:</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}>
          <div className="col-12 col-lg-9">
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="form-input w-100"
              value={formState.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-9">
            <input
              name="totalPages"
              placeholder="Total Pages"
              type="number"
              value={formState.totalPages}
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-9">
            <input value={formState.pagesRead}
              onChange={handleChange}
              type="number"
              name="pagesRead"
              placeholder="Pages Read"
              className="form-input w-100">
              
            </input>
          </div>
          <div className="col-12 col-lg-3">
            <button className="btn btn-primary btn-block py-3" type="submit">
              Add Current Book
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

      }
    </div>
  )
}


export default CurrentBookForm;
