import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


function NovelDetail(){
   

    return (
        <div>hello</div>
    )
}

// import { useStoreContext } from '../utils/GlobalState';
// import {

//   UPDATE_BOOKS,
// } from '../utils/actions';
// import { QUERY_BOOKS } from '../utils/queries';
// import spinner from '../assets/spinner.gif';

// function Detail() {
//   const [state, dispatch] = useStoreContext();
//   const { id } = useParams();

//   const [currentBook, setCurrentBook] = useState({});

//   const { loading, data } = useQuery(QUERY_BOOKS);

//   const { books, 
//   } = state;

//   useEffect(() => {
//     if (books.length) {
//       setCurrentBook(books.find((book) => book._id === id));
//     } else if (data) {
//       dispatch({
//         type: UPDATE_BOOKS,
//         books: data.books,
//       });
//     }
//   }, [books, data, loading, dispatch, id]);


//   return (
//     <>
//       {currentBook 
//        ? (
//         <div className="container my-1">
//           <Link to="/">← Back to Home</Link>
//           <div className="category-card">

//           <h2>{currentBook.name}</h2>

//           <p>{currentBook.author}</p>

//           <p>
//           <div className="points">
//             {currentBook.points}{' '} points
//             <i className="points-icon"><GiTrophy /></i>
//           </div>

//           </p>
//           </div>
//             <NavIcons/>
//         </div>
//       ) : null}
//       {loading ? <img src={spinner} alt="loading" /> : null}
//     </>
//   );
// }

export default NovelDetail;