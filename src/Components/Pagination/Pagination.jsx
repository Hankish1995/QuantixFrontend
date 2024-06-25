import React from 'react'
import "./pagination.css"
import ReactPaginate from 'react-paginate'
const Pagination = ({pageCount,totalCount,handlePageClick,currentPage}) => {

  return (
    <div className='pagination_wrapper'>

<ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={totalCount}
        pageCount={pageCount}
        previousLabel="Previous"
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
        activeClassName='selected'
      />
    </div>
  )
}

export default Pagination