import React from 'react';
import Link from "next/link"
import Image from "next/image"


const Cards = ({animals}) => {
    return (
        <div className='grid md:grid-cols-2    lg:grid-cols-4 gap-2 bg-slate-100 '>
<div className="card bg-white shadow-sm w-max">
  <figure className="px-10 pt-10 ">
    <Image
      src={animals.image_url}
      alt="animals"
      width={200}
      height={50}
      
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{animals.name}</h2>
    <p>Breed: {animals.breed}</p>
    <p>Age: {animals.age}</p>
    <p>Weight:{animals.weight}</p>
    <p className='text-2xl font-bold text-green-500'>Price: {animals.price}</p>
   
    <div className="card-actions">
      <button className="btn btn-neutral font-bold w-full"> <Link href ={`/animals/${animals.id}`} >View Details</Link></button>
    </div>
  </div>
</div>
    
        </div>
  );      
     
};

export default Cards;