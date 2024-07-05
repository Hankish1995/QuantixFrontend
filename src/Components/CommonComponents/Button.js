import React from 'react'
import SpinnerLoder from './SpinnerLoder'
import "./commonStyle.css"
const Button = ({btntext,type,className,isLoading}) => {
  return (
    <button className={className} type={type}>{isLoading ?<SpinnerLoder/>:btntext }</button>
  )
}

export default Button