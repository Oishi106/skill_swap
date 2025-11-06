import React from 'react'
import Mylink from './Mylink';

const Skillcard = ({skill}) => {
    const { skillName, price, rating, image,description,skillId } = skill; 
  return (
     <div className="card  w-96 shadow-sm rounded-xl p-4 border border-gray-100 bg-[#8FABD4]  text-white">
            <figure>
              <img
                className="object-cover w-full h-48 rounded-lg"
                src={image}
                alt={skillName}
              />
            </figure>
            <div className="card-body ">
              <h2 className="card-title">{skillName}</h2>
              <h1 className='text-orange-500'>Rating-{rating}</h1>
              <h1 className='text-sky-600 font-bold'>Price-${price}</h1>
              <p className='text-gray-600 font-semibold'>
              {description}
              </p>
              <div className="card-actions justify-start">
                <Mylink to={`/details/${skillId}`} skill={skill} className="btn btn-active start-right">View Details</Mylink>
              </div>
            </div>
          </div>
    
  )
}

export default Skillcard