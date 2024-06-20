import React from 'react'

const Button = ({btntext,type,className}) => {
  return (
    <button className={className} type={type}>{btntext}</button>
  )
}

export default Button