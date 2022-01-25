import React, { useState } from 'react';


import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CURRENT_BOOKS, QUERY_SINGLE_USER } from '../utils/queries';
import { UPDATE_CURRENT_BOOK, REMOVE_CURRENT_BOOK } from '../utils/mutations';

import CurrentBookForm from "../components/CurrentBookForm";


function CurrentBooksList() {
    const { loading, data } = useQuery(QUERY_CURRENT_BOOKS);
    const [formState, setFormState] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const [removeCurrentBook] = useMutation(REMOVE_CURRENT_BOOK);


    const [editCurrentBook, { error }] = useMutation(UPDATE_CURRENT_BOOK)

    let currentBooks;



    if (data) {
        currentBooks = data.currentBooks
        console.log(currentBooks)

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


                    {currentBooks ? (
                        <>
                            <h2>Your Current Books:</h2>
                            {currentBooks.map((currentBook) => (

                                <div
                                    key={currentBook._id}

                                    className="col-sm-12 col-md-2 col-lg-2 card"
                                

                                >
                                    <p>  <span className="card-subheader">{currentBook.name}</span> 
                                        <br />
                                        {currentBook.pagesRead}/{currentBook.totalPages} Pages Read
                                        < br />
                                    </p>
                                    <button className="btn btn-dark btn-sm  py-1" onClick={() => setShowEdit(!showEdit)}>{showEdit ? 'Finished Updating' : 'Update Entry'}</button>
                                    {showEdit && <div>
                                        <form

                                            // className="flex-row justify-center justify-space-between-md align-center"
                                            onSubmit={e => {
                                                e.preventDefault();
                                                editCurrentBook({ variables: { _id: currentBook._id, pagesRead: formState.pagesRead } });
                                                window.location.reload();
                                            }}
                                        >
                                            <input value={formState.pagesRead}
                                                onChange={handleChange}
                                                type="number"
                                                name="pagesRead"
                                                placeholder="Update Pages"
                                                className="form-input w-100 select">
                                            </input>



                                            <button className="btn btn-dark btn-sm  py-1" type="submit">Submit</button>
                                        </form>
                                    </div>}
                                    <div>
                                        <button className="btn btn-sm btn-primary py-1"
                                            type="submit"
                                            onClick={() => {
                                                removeCurrentBook({ variables: { _id: currentBook._id } })
                                            }}>Remove Entry</button>
                                    </div>



                                </div>






                            ))}
                            <div className="col-sm-12">
                                <CurrentBookForm />
                            </div>
                        </>
                    ) : null}
                </div>

        </>
    );
}


export default CurrentBooksList;