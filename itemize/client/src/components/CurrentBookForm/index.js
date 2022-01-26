import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// import { useStoreContext } from "../../utils/GlobalState";

import { ADD_CURRENT_BOOK } from '../../utils/mutations';

import Auth from '../../utils/auth';

import swal from 'sweetalert';

function CurrentBookForm(props) {
  // const [state, dispatch] = useStoreContext();
  const [formState, setFormState] = useState({ name: '', totalPages: '', pagesRead: ''});


  const [addCurrentBook, { error }] = useMutation(ADD_CURRENT_BOOK);

  const addAlert = () => {
    swal({title: "Entry Added", type: "success"}).then(function(){
        window.location.reload();
    })
}

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await addCurrentBook({
        variables: { owner: Auth.getProfile().data.name, name: formState.name, totalPages: formState.totalPages, pagesRead: formState.pagesRead},

      });
     
      addAlert()
      
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
    console.log(Auth.getProfile().data);
  };




  return (
   
      <>

      {Auth.loggedIn() ? (

        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}>
                      <div className="col-12 col-lg-9 mx-auto">
            <input
              name="name"
              type="name"
              placeholder="Title"
              className="form-input w-100"
              value={formState.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-9 mx-auto">
            <input
              name="pagesRead"
              placeholder="Pages Read"
              value={formState.pagesRead}
              type="pagesRead"
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-lg-9 mx-auto">
            <input
              name="totalPages"
              placeholder="Total Pages"
              type="totalPages"
              value={formState.totalPages}
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-lg-9 mx-auto">
            <button className="btn btn-primary btn-block py-2 w-50 mx-auto" type="submit">
              Add CurrentBook
            </button>
          </div>
          
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              Something went wrong...
            </div>
          )}
        </form>
    
      ) : (<p>
        You need to be logged in. Please{' '}
        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
      </p>)

      }
</>
  )
}


export default CurrentBookForm;
