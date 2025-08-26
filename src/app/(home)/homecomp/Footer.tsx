import Link from 'next/link'
import { FaClock, FaHome, FaPhone, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className='bg-[#0D1117] text-gray-400 p-10 font-sans'>
      <div className='container mx-auto'>
        {/* Main footer content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          
          {/* Brand section */}
          <div className='flex flex-col gap-4'>
            <h1 className='text-white text-3xl font-bold'>ORITINA</h1>
            <p className='text-sm max-w-xs'>
              Premium quality products with exceptional customer service. Shopping made easy and enjoyable.
            </p>
            <div className='flex gap-4 mt-2'>
              <a href="#" className='bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors'>
                <FaFacebookF size={16} />
              </a>
              <a href="#" className='bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition-colors'>
                <FaTwitter size={16} />
              </a>
              <a href="#" className='bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors'>
                <FaInstagram size={16} />
              </a>
              <a href="#" className='bg-gray-800 p-2 rounded-full hover:bg-blue-700 transition-colors'>
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className='flex flex-col gap-4'>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className='grid grid-cols-2 gap-2'>
              <Link href={"/"} className='hover:text-white transition-colors text-sm'>
                About Us
              </Link>
              <Link href={"/"} className='hover:text-white transition-colors text-sm'>
                Contact Us
              </Link>
              <Link href={"/"} className='hover:text-white transition-colors text-sm'>
                Reasons to Shop
              </Link>
              <Link href={"/"} className='hover:text-white transition-colors text-sm'>
                Help & Advice
              </Link>
              <Link href={"/"} className='hover:text-white transition-colors text-sm'>
                Delivery Info
              </Link>
              <Link href={"/"} className='hover:text-white transition-colors text-sm'>
                Privacy Policy
              </Link>
              <Link href={"/"} className='hover:text-white transition-colors text-sm'>
                Terms & Conditions
              </Link>
              <Link href={"/"} className='hover:text-white transition-colors text-sm'>
                FAQs
              </Link>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className='flex flex-col gap-4'>
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-3 items-start'>
                <FaHome className='mt-1 flex-shrink-0' />
                <p className='text-sm'>123 Suspendis matti, Visaosang Building, VST District, NY 10001</p>
              </div>
              
              <div className='flex gap-3 items-start'>
                <FaClock className='mt-1 flex-shrink-0' />
                <p className='text-sm'>Mon-Sun: 8:00 AM - 7:00 PM<br />(Except Holidays)</p>
              </div>
              
              <div className='flex gap-3 items-center'>
                <IoMdMail />
                <p className='text-sm'>support@oritina.com</p>
              </div>
              
              <div className='flex gap-3 items-center'>
                <FaPhone />
                <p className='text-sm'>+1 012-345-6789</p>
              </div>
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div className='flex flex-col gap-4'>
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className='text-sm'>Subscribe to get special offers, free giveaways, and new product alerts</p>
            <div className='flex flex-col gap-3'>
              <input 
                type="email" 
                placeholder="Your email address" 
                className='bg-gray-800 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button className='bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition-colors'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className='border-t border-gray-800 my-6'></div>
        
        {/* Copyright section */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-gray-500'>© 2023 Oritina. All rights reserved.</p>
          <div className='flex gap-6'>
            <a href="#" className='text-sm text-gray-500 hover:text-white transition-colors'>Privacy Policy</a>
            <a href="#" className='text-sm text-gray-500 hover:text-white transition-colors'>Terms of Service</a>
            <a href="#" className='text-sm text-gray-500 hover:text-white transition-colors'>Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer