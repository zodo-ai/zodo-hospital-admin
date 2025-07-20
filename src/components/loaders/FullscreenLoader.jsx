import React from 'react'

function FullscreenLoader() {
  return (
    <div className="overlay-loader">
      <div className="spinner-border custom-loader" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default FullscreenLoader