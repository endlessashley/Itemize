import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_NONFICTIONS, QUERY_SINGLE_USER } from '../utils/queries';
import { UPDATE_NONFICTION, REMOVE_NONFICTION } from '../utils/mutations';

import NonfictionForm from "../components/NonfictionForm";
import CompleteNonfiction from "../components/CompleteNonfiction";
import IncompleteNonfiction from "../components/IncompleteNonfiction";

import Auth from '../utils/auth';

import swal from 'sweetalert';



function NonfictionsList() {
    const { loading, data } = useQuery(QUERY_NONFICTIONS);
    const [formState, setFormState] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [showNonfictionForm, setShowNonfictionForm] = useState(false)
    const [showCompleteNonfiction, setShowCompleteNonfiction] = useState(false)
    const [showIncompleteNonfiction, setShowIncompleteNonfiction] = useState(false)

    const [removeNonfiction] = useMutation(REMOVE_NONFICTION);
    const [editNonfiction, { error }] = useMutation(UPDATE_NONFICTION)

    let nonfictions;



    let result

    const removeAlert = () => {
        swal({title: "Entry Removed", type: 
        "success"}).then(function(){ 
           window.location.reload();
           }
        );
      }

      const editAlert = () => {
        swal({title: "Entry Updated", type: "success"})
        // .then(function(){
        //     window.location.reload();
        // })
    }


    if (data) {
        nonfictions = data.nonfictions
        result = data.nonfictions.filter((nonfiction) => nonfiction.owner == Auth.getProfile().data.name) 
        

        console.log(Auth.getProfile().data.name)
        console.log(data.nonfictions)
        console.log(result)
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
                    {result ? (
                        <>
             <button className="btn btn-showme btn-block py-3" onClick={() => setShowNonfictionForm(!showNonfictionForm)}>{showNonfictionForm ? 'Finished Adding' : 'Add New Nonfiction'}</button>
            {showNonfictionForm && <div className="row"><NonfictionForm /></div>}
            <button className="btn btn-showme btn-block py-3" onClick={() => setShowCompleteNonfiction(!showCompleteNonfiction)}>{showCompleteNonfiction ? 'Hide Complete Nonfiction' : 'View Complete Nonfiction '}</button>
            {showCompleteNonfiction && <div className="row"><CompleteNonfiction /></div>}
            <button className="btn btn-showme btn-block py-3" onClick={() => setShowIncompleteNonfiction(!showIncompleteNonfiction)}>{showIncompleteNonfiction ? 'Hide Incomplete Nonfiction' : 'View Incomplete Nonfiction'}</button>
            {showIncompleteNonfiction && <div className="row"><IncompleteNonfiction /></div>}

            <div className="row">
            <div style={{margin: "20px"}} className="col-12 col-lg-9 text-center">
                <h2>Search Nonfiction: </h2>
                <input
                type="text"
                name="search"
                style={{width: '25vw'}}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                />
            </div>
            </div>
                                
                              
 
                           
                            {result
                            .filter(nonfiction => nonfiction.name.match(new RegExp(searchValue, "i")) || nonfiction.author.match(new RegExp(searchValue, "i")))
                            .map((nonfiction) => (

                                <div
                                    key={nonfiction._id}
                                    className="col-sm-12 col-md-3 col-lg-3 card">
                                    <p>  {nonfiction.name}
                                        < br />
                                        <span className="card-subheader" >by</span> {nonfiction.author}
                                        < br />
                                        <span className="card-subheader">Rank:</span> {nonfiction.rank}
                                        < br />
                                        <span key={nonfiction.isComplete}>{nonfiction.isComplete}</span>
                                    </p>

                                    {/* <button className="btn btn-dark btn-sm  py-1" onClick={() => setShowEdit(!showEdit)}>{showEdit ? 'Finished Updating' : 'Update Entry'}</button>
                                    {showEdit && */}
                                     <div>
                                        <form
                                            onSubmit={e => {
                                                e.preventDefault();
                                                editNonfiction({ variables: { _id: nonfiction._id, isComplete: formState.isComplete } });
                                               editAlert()
                                                
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
                                                <option selected value="" disabled selected>Update Status</option>
                                                {/* <option selected value="N/A"> Set Status</option> */}
                                            </select>



                                            <button className="btn btn-dark btn-sm  py-1" type="submit">Submit</button>
                                        </form>
                                    </div>
                                    {/* } */}
                                    <div>
                                        <button className="btn btn-sm btn-primary py-1"
                                            type="submit"
                                            onClick={() => {
                                                removeAlert()
                                                removeNonfiction({ variables: {_id: nonfiction._id } })
                                               
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


export default NonfictionsList;