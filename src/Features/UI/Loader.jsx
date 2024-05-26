import React from 'react'

export default function Loader() {
  return (
    // <div className='z-50 absolute inset-0 bg-stone-400/50 flex items-center justify-center backdrop-blur-sm'>
    //     <div className='loader'></div>
    // </div>
    <div className='z-[99999] fixed inset-0 bg-stone-400/50 flex items-center justify-center backdrop-blur-sm '>
    <div class="lds-ripple ">
      <div>
      </div>
      <div>
      </div>
    </div>
    </div>
  )
}
