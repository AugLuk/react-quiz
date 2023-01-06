import React from 'react'

export default function Goodbye() {
  return (
    <div className='main-container flex-center'>
      <div className="card flex-center">
        <h1 className="card--title">
          Thank you for playing!
        </h1>
      </div>
      <div
        className="bottom-button"
        onClick={() => {window.location.reload()}}
      >
        Play Again
      </div>
    </div>
  )
}
