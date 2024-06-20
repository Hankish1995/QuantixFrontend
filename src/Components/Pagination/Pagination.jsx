import React from 'react'
import "./pagination.css"
import ReactPaginate from 'react-paginate'
const Pagination = () => {
  return (
    <div className='pagination_wrapper'>

        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={""}
          pageRangeDisplayed={5}
          pageCount={5}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
        />
    </div>
//     <div className='pagination_outer text-end cmn_padding'>
//     <nav aria-label="Page navigation example">
//     <ul className="pagination pagination_outer">
//       <li className="page-item"><a className="page-link" href="#">Previous</a></li>
//       <li className="page-item"><a className="page-link" href="#">1</a></li>
//       <li className="page-item"><a className="page-link" href="#">2</a></li>
//       <li className="page-item"><a className="page-link" href="#">3</a></li>
//       <li className="page-item"><a className="page-link" href="#">Next</a></li>
//     </ul>
//   </nav>

//     </div>
  )
}

export default Pagination