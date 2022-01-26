import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_NONFICTIONS, QUERY_SINGLE_USER } from '../../utils/queries';
import { UPDATE_NONFICTION, REMOVE_NONFICTION } from '../../utils/mutations';
import Auth from '../../utils/auth';

import swal from 'sweetalert';

function CompleteNonfiction() {

    const { loading, data } = useQuery(QUERY_NONFICTIONS);
    const [showEdit, setShowEdit] = useState(false);
    const [formState, setFormState] = useState('');
    const [showComplete, setShowComplete] = useState(false)

    const [removeNonfiction] = useMutation(REMOVE_NONFICTION);

    let nonfictions;
    let complete;



    const [editNonfiction, { error }] = useMutation(UPDATE_NONFICTION)

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });

        console.log(formState)
    };

    if (data) {
        nonfictions = data.nonfictions
        console.log(nonfictions)
        complete = nonfictions.filter(nonfiction => nonfiction.isComplete == "Complete" && nonfiction.owner == Auth.getProfile().data.name);
        console.log(complete)


    }

    const removeAlert = () => {
        swal({title: "Entry Removed", type: 
        "success"}).then(function(){ 
           window.location.reload();
           }
        );
      }
    
      const editAlert = () => {
          swal({title: "Entry Updated", type: "success"})
        //   .then(function(){
        //       window.location.reload();
        //   })
      }

return (
    <>


        <div className="row">


            {complete ? (
                <>

                
                    <h3>Completed Nonfiction ({complete.length}/{nonfictions.length}):</h3>
                    {complete.map((nonfiction) => (


                        <div
                            key={nonfiction._id}

                            className="col-sm-12 col-md-3 col-lg-3 card"
                 

                        >
                            <p>  {nonfiction.name}
                                < br />
                                <span className="card-subheader" >by</span> {nonfiction.author}
                                < br />
                                <span className="card-subheader">Rank:</span> {nonfiction.rank}
                                < br />
                                <span key={nonfiction.isComplete}
                                    >
                                    {nonfiction.isComplete}</span>
                            </p>
                      
                            <div>
                                <form


                                    onSubmit={e => {
                                        e.preventDefault();
                                        editAlert()
                                        editNonfiction({ variables: { _id: nonfiction._id, isComplete: formState.isComplete } });
                                        
                                    }}
                                >
                                    <select value={formState.isComplete}
                                        onChange={handleChange}
                                        type="isComplete"
                                        name="isComplete"
                                        placeholder="Update Completed Status"
                                        className="form-input w-100 select">
                                        <option value="Complete">Complete</option>
                                        <option value="Incomplete">Incomplete</option>
                                        <option selected value="N/A"> Set Status</option>
                                    </select>



                                    <button className="btn btn-dark btn-sm  py-1" type="submit">Submit</button>
                                </form>
                            </div>
                            <div>
                                <button className="btn btn-sm btn-primary py-1"
                                    type="submit"
                                    onClick={() => {
                                        removeAlert()
                                        removeNonfiction({ variables: { _id: nonfiction._id } })
                                        
                                    }}>Remove Entry</button>
                            </div>



                        </div>






                    ))}
                
                </>
            ) : null}
            



        </div>

    </>
);
}


export default CompleteNonfiction;