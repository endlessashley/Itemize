import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// import { useStoreContext } from "../../utils/GlobalState";

import { ADD_NOVEL } from '../../utils/mutations';

import Auth from '../../utils/auth';

import swal from 'sweetalert';

function NovelForm(props) {
  // const [state, dispatch] = useStoreContext();
  const [formState, setFormState] = useState({ name: '', author: '', rank: '', isComplete: '' });


  const [addNovel, { error }] = useMutation(ADD_NOVEL);

  const addAlert = () => {
    swal({title: "Entry Added", type: "success"})
    .then(function(){
        window.location.reload();
    })
}

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await addNovel({
        variables: { owner: Auth.getProfile().data.name, name: formState.name, author: formState.author, rank: formState.rank, isComplete: formState.isComplete },

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
              name="author"
              placeholder="Author"
              value={formState.author}
              type="author"
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>
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
              name="rank"
              placeholder="Rank"
              type="rank"
              value={formState.rank}
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-9 mx-auto">
            <select value={formState.isComplete}
              onChange={handleChange}
              type="isComplete"
              name="isComplete"
              className="form-input w-100">
                <option selected value="" disabled selected>Select Completed Status</option>
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
              
            </select>
          </div>
          <div className="col-12 col-lg-9 mx-auto">
            <button className="btn btn-primary btn-block py-2 w-50 mx-auto" type="submit">
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
        You need to be logged in. Please{' '}
        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
      </p>)

      }
</>
  )
}


export default NovelForm;
