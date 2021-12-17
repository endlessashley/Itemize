import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_NOVELS, QUERY_SINGLE_USER } from '../utils/queries';
import {UPDATE_NOVEL} from '../utils/mutations';

import NovelForm from "../components/NovelForm";
import UpdateNovel from "../components/UpdateNovel"

function NovelsList() {
    const { data } = useQuery(QUERY_NOVELS);
    const [formState, setFormState] = useState('');

    const [editNovel, {error}] = useMutation(UPDATE_NOVEL)

    let novels;

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

    // const handleChange = (event) => {
    //     const { name, value } = event.target;

        // if (event.target = "Yes") {
        //     formState.isComplete = "Yes"
        // } else formState.isComplete = "No"
  
    //     setFormState({
    //         value: event.target.value
    //     });
    //   };

    // const handleChange = (event) => {
    //     this.setFormState({value: event.target.value})
    // }


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
                                    <p> <span className="card-subheader">Title:</span> {novel.name}
                                        < br />
                                        <span className="card-subheader" >Author:</span> {novel.author}
                                        < br />
                                        <span className="card-subheader">Rank:</span> {novel.rank}
                                        < br />
                                        <span className="card-subheader">Completed:</span> {novel.isComplete}
                                    </p>
                                    <form 
                                          key={novel._id}
                                          className="flex-row justify-center justify-space-between-md align-center"
                                              onSubmit={e=> {
                                                  e.preventDefault();
                                                  editNovel({variables: {_id: novel._id, isComplete: formState.isComplete}});
                                              }}
                                              >
                                                  <select value={formState.isComplete}
                                                   onChange={handleChange}
                                                   type="isComplete"
                                                   name="isComplete"
                                                   className="form-input w-100">
                                                      <option value="Complete">Complete</option>
                                                      <option value="Incomplete">Incomplete</option>
                                                  </select>
                                                {/* <input
                                                  name="isComplete"
                                                  placeholder={novel.isComplete}
                                                  value={formState.isComplete}
                                                  type="isComplete"
                                                  className="form-input w-100"
                                                  onChange={handleChange}
                                                /> */}

                                    
                                        <button className="btn btn-primary  py-1" type="submit">Submit</button>
                                    </form>
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