import React from 'react'

export default function CommentSection() {
    const data = [
        {
            name:'test',
            comment:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci, deleniti."
        },
        {
            name:'test',
            comment:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci, deleniti."
        },
        {
            name:'test',
            comment:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci, deleniti."
        },
        {
            name:'test',
            comment:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci, deleniti."
        },
        {
            name:'test',
            comment:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci, deleniti."
        },
    ]
  return (
    <div className='mt-6'>
        {data.map((item, index)=>(
            <div className="card w-full bg-base-100 border mt-2" key={index}>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>{item.comment}</p>
            </div>
          </div>
        ))}
    </div>
  )
}
