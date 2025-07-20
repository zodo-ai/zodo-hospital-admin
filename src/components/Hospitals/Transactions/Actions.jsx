import React from 'react'
import { deleteicon, pencil_notebook} from '../../imagepath'
function Actions() {
  return (
    <div className='d-flex'>
        <div className='ms-2'><img src={pencil_notebook}/></div>
        <div className='ms-2'><img src={deleteicon}/></div>
    </div>
  )
}

export default Actions