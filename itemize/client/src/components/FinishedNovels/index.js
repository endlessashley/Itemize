import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_NOVELS, QUERY_SINGLE_USER } from '../../utils/queries';
import { UPDATE_NOVEL, REMOVE_NOVEL } from '../../utils/mutations';
import Auth from '../../utils/auth';

import NovelForm from "../NovelForm";

function FinishedNovels() {

    const { loading, data } = useQuery(QUERY_NOVELS);
    const [showEdit, setShowEdit] = useState(false);
    const [formState, setFormState] = useState('');
    const [searchValue, setSearchValue] = useState("")
    const [showNovelForm, setShowNovelForm] = useState(false)

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
        // complete = novels.filter(novel => novel.isComplete == "Complete" && novel.owner == Auth.getProfile().data.name);
        // console.log(complete)
        // incomplete = novels.filter(novel => novel.isComplete !=="Complete");
        // console.log(incomplete)

    }


    return (

        <div className="row" >

            <button className="btn btn-showme btn-block py-3" onClick={() => setShowNovelForm(!showNovelForm)}>{showNovelForm ? 'Finished Adding' : 'Click to Add a New Novel'}</button>
            {showNovelForm && <div><NovelForm /></div>}

            <div style={{margin: "20px"}}>
                <h2>Search Novels: </h2>
                <input
                type="text"
                name="search"
                style={{width: '25vw'}}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                />
            </div>
        {novels
                .filter(novel => novel.name.match(new RegExp(searchValue, "i")) || novel.author.match(new RegExp(searchValue, "i")))
                .map(novel => {
                    return <div key={novel.id} className="col-sm-12 col-md-2 col-lg-2 card">






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
                })}

        </div>

    )
}



export default FinishedNovels;