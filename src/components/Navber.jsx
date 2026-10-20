"use client"
import React from 'react';
// import logo from "@/assets/logo.png"
import Image from "next/image"

import Link from "next/link"
import { usePathname } from 'next/navigation';
import { authClient } from "@/lib/auth-client"
import DropDownHover from '@/components/DropDownHover'

const Navbar = () => {
const { data: session, isPending } = authClient.useSession();
console.log (session, "session")

const user = session?.user;
console.log (user, "session");


    const pathname = usePathname ();
    console.log (pathname, "pathname");

    const isActive = (href) =>{
       return href === pathname;
    };
    
    return (
        <div className='flex flex-col-3 justify-between container mx-auto my-5 shadow-md p-4'>
            <div className='flex gap-3'>
            {/* <Image src={logo} */}
            <Image src='/logo'
      alt="Picture of the author"
      width={50}
      height={50} />
            <p className='font-bold text-lg'>Qurbani Hat</p> 
            </div>
            
                <ul className='flex gap-3'>
                    <li><Link href={"/"} className={`${isActive ("/") ? " border-b-4 border-b-green-600": "" }`}  >Home</Link></li>
                    <li><Link href={"/allanimals"} className={`${isActive ("/allanimals") ? " border-b-4 border-b-green-600" : ""}`} >All Animals</Link></li>
                    <li><Link href={"/profile"} className={`${isActive ("/profile") ? " border-b-4 border-b-green-600" : ""}`} >My Profile</Link></li>
                    <li><Link href={"/products"} className={`${isActive ("/products") ? " border-b-4 border-b-green-600" : ""}`} >Products</Link></li>
                    <li><Link href={"/add-product"} className={`${isActive ("/add-product") ? " border-b-4 border-b-green-600" : ""}`} >Add Product</Link></li>
                    <li><Link href={"/products/manage"} className={`${isActive ("/products/manage") ? " border-b-4 border-b-green-600" : ""}`} >Manage</Link></li>
                    
                </ul>
 <div className='flex gap-2  items-center'>
   {isPending ? <span className="loading loading-spinner text-success"></span> :
    user ? ( <div className='flex gap-2 items-center'>
           
    <div className='rounded-full flex gap-2'> 
        <Image src={user.image  }
        // referrerPolicy='no-referrer'
      alt=" author"
      width={50}
      height={50} 
      />  
      {/* <h2>Hi,{user.name}</h2>  */}
                  </div>
                  <div>
                     < DropDownHover />  
                  </div>
        
                    <button className='btn btn-success' 
                    onClick={async () => await authClient.signOut()} >
                       Sign Out</button>
   </div>)
   
                  :( <div className='flex gap-3'>
                    <button className='btn btn-success'>
                        <Link href = {"/signin"}>Sign in</Link></button>
         

                    <button className='btn btn-success'>
                        <Link href ={"/signup"}>Sign Up</Link>
                        </button>
                    
                    </div>)}
        </div>
        </div>
    );
};

export default Navbar;