import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_NOVELS, QUERY_SINGLE_USER } from '../utils/queries';
import { UPDATE_NOVEL, REMOVE_NOVEL } from '../utils/mutations';

import NovelForm from "../components/NovelForm";
import FinishedNovels from "../components/FinishedNovels"
import Auth from '../utils/auth';


function NovelsList() {
    const { loading, data } = useQuery(QUERY_NOVELS);
    const [formState, setFormState] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [searchValue, setSearchValue] = useState('')

    const [removeNovel] = useMutation(REMOVE_NOVEL);
    const [editNovel, { error }] = useMutation(UPDATE_NOVEL)

    let novels;

    let user

    let result


    



    if (data) {
        novels = data.novels
        result = data.novels.filter((novel) => novel.owner == Auth.getProfile().data.name)
        
        // data.novels.filter(
        //     (novel) => novels.owner === Auth.getProfile().data.name,
        // )
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


    // const getCondition = () => {
    //     let condition
    //     novels.map(novel);
    //     if (novel.isComplete === "Complete") {
    //         condition = true
    //     } else condition = false
    // }


    return (
        <>


                <div className="row">
                    {result ? (
                        <>
                                                    {/* <div className="col-sm-12"> */}
                                <NovelForm />
                                <FinishedNovels />
                            {/* </div> */}
                            <h2>Your Novels:</h2>
                            {result.map((novel) => (

                                <div
                                    key={novel._id}
                                    className="col-sm-12 col-md-2 col-lg-2 card">
                                    <p>  {novel.name}
                                        < br />
                                        <span className="card-subheader" >by</span> {novel.author}
                                        < br />
                                        <span className="card-subheader">Rank:</span> {novel.rank}
                                        < br />
                                        <span key={novel.isComplete}>{novel.isComplete}</span>
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
                                                <option selected value="" disabled selected>Select Status</option>
                                                {/* <option selected value="N/A"> Set Status</option> */}
                                            </select>



                                            <button className="btn btn-dark btn-sm  py-1" type="submit">Submit</button>
                                        </form>
                                    </div>}
                                    <div>
                                        <button className="btn btn-sm btn-primary py-1"
                                            type="submit"
                                            onClick={() => {
                                                removeNovel({ variables: {_id: novel._id } })
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