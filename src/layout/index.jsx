import React from 'react'
import Navbar from './Navbar'
import Slidebar from './Slidebar'
import  Footer  from './Footer'
import { Outlet } from 'react-router-dom'

const LayoutPrivate  = () => {
  return (
    <div>
    <Navbar />
    <div>
        <Slidebar />
        <div >
            <Outlet/>
            <Footer/>
        </div>
    </div>
   
</div>
  )
}

export default LayoutPrivate 