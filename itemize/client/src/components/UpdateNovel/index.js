import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useParams } from 'react-router-dom';
import { UPDATE_NOVEL, ADD_NOVEL } from '../../utils/mutations';
import Auth from '../../utils/auth';


function UpdateNovel(props) {
    const [isComplete, setIsComplete] = useState('');
    // const [novelId, set_id] = useState('');
    const [updateNovel] = useMutation(UPDATE_NOVEL);
    // const [addNovel, {error}] = useMutation(ADD_NOVEL)

  

    const handleEditSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await updateNovel({
            variables: {
              isComplete
            },
          });
          setIsComplete('');
        //   (data);
        //   console.log(props)
          //calls for the query on either the homepage or daypage to run again
          props.refetch();
        } catch (err) {
          console.error(err);
        }
      };

    // const handleEditSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const { data } = await updateNovel({
    //             variables: {
    //                 novelId,
    //                 isComplete,
    //             },
    //         });
    //         setIsComplete('');
    //         set_id('');
    //         console.log(data);
    //         window.location.reload();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
            <div>
        
              {Auth.loggedIn() ? (
              <div>
                  <h3>Update task:</h3>
                  <form className="" onSubmit={handleEditSubmit}>
                    <input
                      type="text"
                      value={isComplete}
                      name="text"
                      onChange={(e) => {
                        setIsComplete(e.target.value)
                      }}
                    ></input>
                    <button className="container">Update</button>
                  </form>
                </div>
                )
               : (
                <p>
                  You need to be logged in to start a todo list.
                </p>
              )}
            </div>
          );
        };



export default UpdateNovel




