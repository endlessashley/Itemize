
   
import React, { useState, useMemo } from 'react';
import Pagination from './Pagination';
// import data from '../mock-data.json'
// import './style.scss';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_NOVELS, QUERY_SINGLE_USER } from '../utils/queries';

let PageSize = 10;
let novels

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, data } = useQuery(QUERY_NOVELS);

if(data) {
  novels = data.novels
  console.log(novels)
  
}
var allNovels = [];

// Populate users array
for(var key in novels) {
    allNovels.push(novels[key]);
    console.log(key)
}



  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return allNovels.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>
    <div>hello</div>
      <table>

        <tbody>
          {currentTableData.map(item => {
            
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.author}</td>
                <td>{item.rank}</td>
                <td>{item.isComplete}</td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={allNovels.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}