import React from 'react'

const messageStyle = {
  width: '100%',
  boxShadow: '0 0 8px 0 #1a273d40',
  border: 0,
  backgroundColor: 'rgb(255, 146, 59, .9)',
  color: '#fff',
  position: 'fixed',
  overflow: 'hidden',
  zIndex: 2400,
  padding: '30px',
  top: 0,
  left: 0,
}

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return (
    <div style={messageStyle}>
      <h4>{message}</h4>
    </div>
  )
}

export default Notification