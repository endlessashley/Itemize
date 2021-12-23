import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_NOVELS, QUERY_SINGLE_USER } from '../utils/queries';
import { UPDATE_NOVEL, REMOVE_NOVEL } from '../utils/mutations';

import NovelForm from "../components/NovelForm";

function CompletedNovels() {

    const { loading, data } = useQuery(QUERY_NOVELS);
    const [showEdit, setShowEdit] = useState(false);
    const [formState, setFormState] = useState('');

    const [removeNovel] = useMutation(REMOVE_NOVEL);

    let novels;
    let complete;
    let incomplete;



    const [editNovel, { error }] = useMutation(UPDATE_NOVEL)

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });

        console.log(formState)
    };

    if (data) {
        novels = data.novels
        console.log(novels)
        complete = novels.filter(novel => novel.isComplete == "Complete");
        console.log(complete)
        incomplete = novels.filter(novel => novel.isComplete !=="Complete");
        console.log(incomplete)

    }
    

return (
    <>


        <div className="row">


            {complete ? (
                <>
                    <h2>Completed Novels ({complete.length}/{novels.length}):</h2>
                    {complete.map((novel) => (


                        <div
                            key={novel._id}

                            className="col-sm-12 col-md-2 col-lg-2 card"
                 

                        >
                            <p>  {novel.name}
                                < br />
                                <span className="card-subheader" >by</span> {novel.author}
                                < br />
                                <span className="card-subheader">Rank:</span> {novel.rank}
                                < br />
                                <span key={novel.isComplete}
                                    >
                                    {novel.isComplete}</span>
                            </p>
                            <button className="btn btn-dark btn-sm  py-1" onClick={() => setShowEdit(!showEdit)}>{showEdit ? 'Finished Updating' : 'Update Entry'}</button>
                            {showEdit && <div>
                                <form


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
                                        removeNovel({ variables: { _id: novel._id } })
                                        window.location.reload()
                                    }}>Remove Entry</button>
                            </div>



                        </div>






                    ))}

                </>
            ) : null}
            {incomplete ? (
                <>
                    <h2>Incomplete ({incomplete.length}/{novels.length}):</h2>
                    {incomplete.map((novel) => (


                        <div
                            key={novel._id}

                            className="col-sm-12 col-md-2 col-lg-2 card"
                 

                        >
                            <p>  {novel.name}
                                < br />
                                <span className="card-subheader" >by</span> {novel.author}
                                < br />
                                <span className="card-subheader">Rank:</span> {novel.rank}
                                < br />
                                <span key={novel.isComplete}
                                    >
                                    {novel.isComplete}</span>
                            </p>
                            <button className="btn btn-dark btn-sm  py-1" onClick={() => setShowEdit(!showEdit)}>{showEdit ? 'Finished Updating' : 'Update Entry'}</button>
                            {showEdit && <div>
                                <form


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
                                        removeNovel({ variables: { _id: novel._id } })
                                        window.location.reload()
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


export default CompletedNovels;