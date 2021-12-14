import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../utils/queries';

import NovelForm from "../components/NovelForm"

function NovelsList() {
    const { data } = useQuery(QUERY_SINGLE_USER);
    let user;


    if (data) {
        user = data.user
        console.log(user)

    }



    return (
        <>
            <div className="container">
                <div className="row">

                    {user ? (
                        <>
                            <h2>{user.name}'s Novels</h2>
                            {user.novels.map((novel) => (
                                <div
                                    key={novel._id}
                                    className="col-sm-12 col-md-3 col-lg-3 card" >
                                        <Link to ={`/noveldetail/${novel._id}`}>
                                    <p> <span className="card-subheader">Title:</span> {novel.name}
                                        < br />
                                        <span className="card-subheader">Author:</span> {novel.author}
                                        < br />
                                        <span className="card-subheader">Rank:</span> {novel.rank}
                                        < br />
                                        <span className="card-subheader">Completed:</span> {novel.isComplete}
                                    </p>
                                    </Link>
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