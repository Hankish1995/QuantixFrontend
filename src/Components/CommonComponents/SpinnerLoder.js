import React from 'react'

const SpinnerLoder = () => {
  return (
    <div className='spinner_loader_outer'>
    <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  </div>
  )
}

export default SpinnerLoder