import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CURRENT_BOOKS, QUERY_SINGLE_USER } from '../utils/queries';
import { UPDATE_CURRENT_BOOK, REMOVE_CURRENT_BOOK } from '../utils/mutations';

import CurrentBookForm from "../components/CurrentBookForm";


import Auth from '../utils/auth';

import swal from 'sweetalert';




function CurrentBooksList(props) {
    const { loading, data } = useQuery(QUERY_CURRENT_BOOKS);
    const [formState, setFormState] = useState('');
;
    const [searchValue, setSearchValue] = useState('')
    const [showCurrentBookForm, setShowCurrentBookForm] = useState(false)


    const [removeCurrentBook] = useMutation(REMOVE_CURRENT_BOOK);
    const [editCurrentBook, { error }] = useMutation(UPDATE_CURRENT_BOOK)

    let currentBooks;



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
        currentBooks = data.currentBooks
        result = data.currentBooks.filter((currentBook) => currentBook.owner == Auth.getProfile().data.name) 
        

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
             <button className="btn btn-showme btn-block py-3" onClick={() => setShowCurrentBookForm(!showCurrentBookForm)}>{showCurrentBookForm ? 'Finished Adding' : 'Add a New Current Book'}</button>
            {showCurrentBookForm && <div className="row"><CurrentBookForm /></div>}
 

            <div className="row">
            <div style={{margin: "20px"}} className="col-12 col-lg-9 text-center">
                <h2>Search Current Books: </h2>
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
                            .filter(currentBook => currentBook.name.match(new RegExp(searchValue, "i")) )
                            .map((currentBook) => (

                                <div
                                    key={currentBook._id}
                                    className="col-sm-12 col-md-4 col-lg-4 card">
                                    <p>  {currentBook.name}
                                        < br />
                                        <span className="card-subheader" >Pages Read:</span> {currentBook.pagesRead}/{currentBook.totalPages}
                                        < br />

                                 
                                    </p>

                                    {/* <button className="btn btn-dark btn-sm  py-1" onClick={() => setShowEdit(!showEdit)}>{showEdit ? 'Finished Updating' : 'Update Entry'}</button>
                                    {showEdit && */}
                                     <div>
                                        <form
                                            onSubmit={e => {
                                                e.preventDefault();
                                                editCurrentBook({ variables: { _id: currentBook._id, pagesRead: formState.pagesRead } });
                                               editAlert()
                                                
                                            }}
                                        >
          <div className="col-12 col-lg-9 mx-auto">
            <input
              name="pagesRead"
              placeholder="Pages Read"
              value={formState.pagesRead}
              type="pagesRead"
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>



                                            <button className="btn btn-dark btn-sm  py-1" type="submit">Submit</button>
                                        </form>
                                    </div>
                                    {/* } */}
                                    <div>
                                        <button className="btn btn-sm btn-primary py-1"
                                            type="submit"
                                            onClick={() => {
                                                
                                                removeCurrentBook({ variables: {_id: currentBook._id } })
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


export default CurrentBooksList;