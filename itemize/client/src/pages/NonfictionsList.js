import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_NONFICTIONS, QUERY_SINGLE_USER } from '../utils/queries';
import { UPDATE_NONFICTION, REMOVE_NONFICTION } from '../utils/mutations';

import NonfictionForm from "../components/NonfictionForm";


function NonfictionsList() {
    const { loading, data } = useQuery(QUERY_NONFICTIONS);
    const [formState, setFormState] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const [removeNonfiction] = useMutation(REMOVE_NONFICTION);


    const [editNonfiction, { error }] = useMutation(UPDATE_NONFICTION)

    let nonfictions;

    // let x = document.getElementById("edit-box")

    // let condition


    if (data) {
        nonfictions = data.nonfictions
        console.log(nonfictions)
    }



    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });

        console.log(formState)
    };





    return (
        <>


                <div className="row">


                    {nonfictions ? (
                        <>
                            <h2>Your Nonfiction:</h2>
                            {nonfictions.map((nonfiction) => (

                                <div
                                    key={nonfiction._id}

                                    className="col-sm-12 col-md-2 col-lg-2 card"
                                

                                >
                                    <p>  {nonfiction.name}
                                        < br />
                                        <span className="card-subheader" >by</span> {nonfiction.author}
                                        < br />
                                        <span className="card-subheader">Rank:</span> {nonfiction.rank}
                                        < br />
                                        <span key={nonfiction.isComplete}>{nonfiction.isComplete}</span>
                                    </p>
                                    <button className="btn btn-dark btn-sm  py-1" onClick={() => setShowEdit(!showEdit)}>{showEdit ? 'Finished Updating' : 'Update Entry'}</button>
                                    {showEdit && <div>
                                        <form

                                            // className="flex-row justify-center justify-space-between-md align-center"
                                            onSubmit={e => {
                                                e.preventDefault();
                                                editNonfiction({ variables: { _id: nonfiction._id, isComplete: formState.isComplete } });
                                                window.location.reload();
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
                                    </div>}
                                    <div>
                                        <button className="btn btn-sm btn-primary py-1"
                                            type="submit"
                                            onClick={() => {
                                                removeNonfiction({ variables: { _id: nonfiction._id } })
                                            }}>Remove Entry</button>
                                    </div>



                                </div>






                            ))}
                            <div className="col-sm-12">
                                <NonfictionForm />
                            </div>
                        </>
                    ) : null}
                </div>

        </>
    );
}


export default NonfictionsList;