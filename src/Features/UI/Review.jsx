import React from 'react'

export default function Review({review, index}) {


    function formatDateString(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return date.toLocaleString('en-US', options);
    }

    const nameRegex = /^([^@]+)/;

  return (
    <div key={index} className='px-7 py-4 border-b-2 mb-2 shadow-sm rounded-lg sm:grid sm:grid-cols-4 gap-x-5 bg-stone-100'>
        <div className='col-span-3 mb-3 flex items-center gap-3'>
            <img src={review.user.photo} alt="" className='w-12 h-12 rounded-full'/>
            <div>
                {
                    !review?.firstName?
                    <h4 className='text-lg primary-text font-bold capitalize'>{review.user.email.match(/^([^@]*)@/)[1] }</h4>
                    :
                    <h4 className='text-lg primary-text font-bold capitalize'>{review.user.firstName +" "+ review.user.lastName }</h4>
                }
                <p className='secondary-text text-lg ms-2'>{review.review}</p>
            </div>
        </div>

        <div className='col-span-1'>
            <div className='mb-2'>
            {
                Array(Math.ceil(review.rating)).fill().map((_, index) => {
                    return <i key={index} className="fas fa-star text-yellow-600"></i>
                })
            }
            </div>
            <p className='secondary-text text-sm'>{formatDateString(review.createdAt)}</p>
        </div>
    </div>
  )
}
