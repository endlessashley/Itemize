import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_NOVELS, QUERY_SINGLE_USER } from '../utils/queries';
import { UPDATE_NOVEL, REMOVE_NOVEL } from '../utils/mutations';

import NovelForm from "../components/NovelForm";
import CompleteNovels from "../components/CompleteNovels";
import IncompleteNovels from "../components/IncompleteNovels";

import Auth from '../utils/auth';

import swal from 'sweetalert';




function NovelsList(props) {
    const { loading, data } = useQuery(QUERY_NOVELS);
    const [formState, setFormState] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [showNovelForm, setShowNovelForm] = useState(false)
    const [showCompleteNovels, setShowCompleteNovels] = useState(false)
    const [showIncompleteNovels, setShowIncompleteNovels] = useState(false)

    const [removeNovel] = useMutation(REMOVE_NOVEL);
    const [editNovel, { error }] = useMutation(UPDATE_NOVEL)

    let novels;



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
        novels = data.novels
        result = data.novels.filter((novel) => novel.owner == Auth.getProfile().data.name) 
        

        console.log(Auth.getProfile().data.name)
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
             <button className="btn btn-showme btn-block py-3" onClick={() => setShowNovelForm(!showNovelForm)}>{showNovelForm ? 'Finished Adding' : 'Add a New Novel'}</button>
            {showNovelForm && <div className="row"><NovelForm /></div>}
            <button className="btn btn-showme btn-block py-3" onClick={() => setShowCompleteNovels(!showCompleteNovels)}>{showCompleteNovels ? 'Hide Complete Novels' : 'View Complete Novels '}</button>
            {showCompleteNovels && <div className="row"><CompleteNovels /></div>}
            <button className="btn btn-showme btn-block py-3" onClick={() => setShowIncompleteNovels(!showIncompleteNovels)}>{showIncompleteNovels ? 'Hide Incomplete Novels' : 'View Incomplete Novels'}</button>
            {showIncompleteNovels && <div className="row"><IncompleteNovels /></div>}

            <div className="row">
            <div style={{margin: "20px"}} className="col-12 col-lg-9 text-center">
                <h2>Search Novels: </h2>
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
                            .filter(novel => novel.name.match(new RegExp(searchValue, "i")) || novel.author.match(new RegExp(searchValue, "i")))
                            .map((novel) => (

                                <div
                                    key={novel._id}
                                    className="col-sm-12 col-md-3 col-lg-3 card">
                                    <p>  {novel.name}
                                        < br />
                                        <span className="card-subheader" >by</span> {novel.author}
                                        < br />
                                        <span className="card-subheader">Rank:</span> {novel.rank}
                                        < br />
                                        <span key={novel.isComplete}>{novel.isComplete}</span>
                                    </p>

                                    {/* <button className="btn btn-dark btn-sm  py-1" onClick={() => setShowEdit(!showEdit)}>{showEdit ? 'Finished Updating' : 'Update Entry'}</button>
                                    {showEdit && */}
                                     <div>
                                        <form
                                            onSubmit={e => {
                                                e.preventDefault();
                                                editNovel({ variables: { _id: novel._id, isComplete: formState.isComplete } });
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
                                                
                                                removeNovel({ variables: {_id: novel._id } })
                                                removeAlert()
                                                // props.reload();
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


export default NovelsList;