import React from 'react'

const Notification = ({ message }) => {
  return message
    ? <div style={{color: 'red'}}>
      {message}
      </div>
    : null
}

export default Notification