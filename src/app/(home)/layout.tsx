import React from 'react'
import Navbar from './homecomp/Navbar'
import Footer from './homecomp/Footer'


const HomeLayout = ({children}: {children: React.ReactNode}) => {


  return (
    <div>
        <Navbar />
          {children}
        <Footer />
    </div>
  )
}

export default HomeLayout