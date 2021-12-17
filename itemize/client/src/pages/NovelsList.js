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

    // const handleEditSubmit = (event) => {
    //     event.preventDefault();
    //     try {
    //       const data =  editNovel({
    //         variables: { _id: novel._id, isComplete: formState.isComplete },
    //       });
          
    //       // window.location.reload();
          
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }


    return (
        <>
            <div className="container">
                <div className="row">

                    {novels ? (
                        <>
                            <h2>Novels</h2>
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
                                                  editNovel({variables: {_id: novel._id, isComplete: formState.value}});
                                              }}
                                              >
                                        
                                                <input
                                                  name="isComplete"
                                                  placeholder={novel.isComplete}
                                                  value={formState.isComplete}
                                                  type="isComplete"
                                                  className="form-input w-100"
                                                  onChange={handleChange}
                                                />

                                    
                                        <button className="btn btn-primary btn-block py-3" type="submit">Update Novel</button>
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