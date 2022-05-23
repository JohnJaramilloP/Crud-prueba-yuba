import React from 'react'

const Message = ( {message, color} ) => {

    let styles = {
        margin:"2rem",
        padding:"2rem",
        marginBottom:"1rem",
        textAlign:"center",
        color:"#fff",
        fontWeight:"bold",
        backgroundColor: color,
    }

  return (
    <div style={styles}>
        <h2>{message}</h2>
    </div>
  )
}

export default Message