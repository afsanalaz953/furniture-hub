import React from 'react';
import Link from "next/link"
import Image from "next/image"
import { TiStar } from 'react-icons/ti';


const Cards = ({products}) => {
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 bg-slate-100 '>
<div className="card bg-white shadow-sm w-max">
  <figure className="px-10 pt-10 ">
    <Image
      src={products.image_url}
      alt="products"
      width={200}
      height={50}
      
      className="rounded-xl object-cover" />
  </figure>
  <div className="card-body items-center space-y-6 text-start ">
    <div className='flex justify-around gap-25 '>
        <p className=' border rounded px-2'>{products.category}</p>
    <p className='font-bold flex '> <span><TiStar /> </span>  
   <span> {products.rating}   </span>
    </p>
    </div>
    <div className=' flex flex-col '> 
      <h2 className="card-title text-start text-lg">{products.name}</h2>
  
    <p className='text-sm line-clamp-2 wrap-break-word w-50 '>{products.description}</p>
    </div>
    <div className='flex justify-between gap-8'>
      <p className='text-sm font-bold text-green-500'> {products.price}</p>
   
    <div className="card-actions">
      <Link href ={`/products/${products.id}`} className="btn font-bold btn-sm bg-[#087C7E]"   >View Details</Link>
    </div>

    </div>
    
    
  </div>
</div>
    
        </div>
  );      
     
};

export default Cards;