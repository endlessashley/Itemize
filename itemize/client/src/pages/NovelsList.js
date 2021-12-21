import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_NOVELS, QUERY_SINGLE_USER } from '../utils/queries';
import { UPDATE_NOVEL, REMOVE_NOVEL } from '../utils/mutations';

import NovelForm from "../components/NovelForm";
import UpdateNovel from "../components/UpdateNovel"

function NovelsList() {
    const { loading, data } = useQuery(QUERY_NOVELS);
    const [formState, setFormState] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const [removeNovel] = useMutation(REMOVE_NOVEL);


    const [editNovel, { error }] = useMutation(UPDATE_NOVEL)

    let novels;

    let x = document.getElementById("edit-box")


    if (data) {
        novels = data.novels
        console.log(novels)
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
            <div className="container">
                <div className="row">


                    {novels ? (
                        <>
                            <h2>Your Novels:</h2>
                            {novels.map((novel) => (
                                <div
                                    key={novel._id}
                                    className="col-sm-12 col-md-3 col-lg-3 card" >
                                    <p>  {novel.name}
                                        < br />
                                        <span className="card-subheader" >by</span> {novel.author}
                                        < br />
                                        <span className="card-subheader">Rank:</span> {novel.rank}
                                        < br />
                                        {novel.isComplete}
                                    </p>
                                    <button className="btn btn-dark  py-1" onClick={() => setShowEdit(!showEdit)}>{showEdit ? 'Finished Updating' : 'Update Entry'}</button>
                                    {showEdit && <div>
                                        <form
                                            
                                            className="flex-row justify-center justify-space-between-md align-center"
                                            onSubmit={e => {
                                                e.preventDefault();
                                                editNovel({ variables: { _id: novel._id, isComplete: formState.isComplete } });
                                                window.location.reload();
                                            }}
                                        >
                                            <select value={formState.isComplete}
                                                onChange={handleChange}
                                                type="isComplete"
                                                name="isComplete"
                                                placeholder="Update Completed Status"
                                                className="form-input w-100">
                                                <option value="Complete">Complete</option>
                                                <option value="Incomplete">Incomplete</option>
                                                <option selected value="N/A"> Update Status</option>
                                            </select>



                                            <button className="btn btn-dark  py-1" type="submit">Submit</button>
                                        </form>
                                    </div>}
                                    <div>
                                    <button className="btn btn-primary py-1"
                                        type="submit"
                                        onClick={()=> {
                                            removeNovel({variables: {_id: novel._id}})
                                        }}>Remove Entry</button>
                                    </div>
                                    


                                </div>






                            ))}
                            <div className="col-sm-12">
                                <NovelForm />
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
}


export default NovelsList;