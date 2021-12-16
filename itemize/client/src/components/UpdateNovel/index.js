import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useParams } from 'react-router-dom';
import { UPDATE_NOVEL, ADD_NOVEL } from '../../utils/mutations';
import Auth from '../../utils/auth';


function UpdateNovel(props) {
    const [isComplete, setIsComplete] = useState('');
    const [novelId, set_id] = useState('');
    const [updateNovel] = useMutation(UPDATE_NOVEL);
    const [addNovel, {error}] = useMutation(ADD_NOVEL)

  

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addNovel({
            variables: {
              isComplete
            },
          });
          setIsComplete('');
          console.log(data);
          console.log(props)
          //calls for the query on either the homepage or daypage to run again
          props.refetch();
        } catch (err) {
          console.error(err);
        }
      };

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await updateNovel({
                variables: {
                    novelId,
                    isComplete,
                },
            });
            setIsComplete('');
            set_id('');
            console.log(data);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
            <div>
        
              {Auth.loggedIn() ? (
                !props.edit ? (
                  <>
                    <form
                      className="flex-row justify-center justify-space-between-md align-center"
                      onSubmit={handleFormSubmit, console.log(props)}
                    >
                      <div className="col-12 col-lg-9">
                        <textarea
                          name="notes"
                          placeholder="New task..."
                          value={isComplete}
                          className="form-input w-200"
                          style={{ lineHeight: '1.5', resize: 'vertical' }}
                          onChange={(e) => setIsComplete(e.target.value)}
                        ></textarea>
                      </div>
        
                      <div className="col-12">
                        <button className="btn btn-block py-3 button dark-color" type="submit">
                          Add to your list
                        </button>
                      </div>
                      {error && (
                        <div className="col-12 my-3 bg-danger text-white p-3">
                          {error.message}
                        </div>
                      )}
                    </form>
                  </>
                ) : (<div>
                  <h3>Update task: {props.edit.value}</h3>
                  <form className="" onSubmit={handleEditSubmit}>
                    <input
                      type="text"
                      placeholder={props.edit.value}
                      value={isComplete}
                      name="text"
                      onChange={(e) => {
                        setIsComplete(e.target.value); set_id(props.edit._id)
                      }}
                    ></input>
                    <button className="container">Update</button>
                  </form>
                </div>
                )
              ) : (
                <p>
                  You need to be logged in to start a todo list.
                </p>
              )}
            </div>
          );
        };



export default UpdateNovel




