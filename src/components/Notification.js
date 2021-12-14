import React from 'react'

const Notification = ({ message }) => {
  return message ?
    <div className='notification'>
      <h4>{message}</h4>
    </div>
    : null
}

export default Notification