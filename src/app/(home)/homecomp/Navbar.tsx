"use client"

import { Input } from '@/components/ui/input'
import { FaHeart, FaShoppingBag, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link'
import { ModeToggle } from '../../utils/ModeToggle';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCartStore } from '@/lib/store';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const {data: session} = useSession();
  const { getTotalItems } = useCartStore();

  const navLinks = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/shop",
      label: "Shop",
    },
    {
      href: "/blogs",
      label: "Blogs"
    },
    {
      href: "/aboutus",
      label: "About Us"
    }
  ];

  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  
  const cartItemCount = isMounted ? getTotalItems() : 0;

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-[#0D1117] shadow-md">
      
      <div className='bg-[#0D1117] w-full items-center justify-center py-4 md:py-6'>
        <div className='flex justify-between items-center container mx-auto px-4'>
          
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          
          <div className="hidden md:flex relative">
            <Input 
              type='text' 
              placeholder='Search...' 
              className='w-fit pr-10 bg-gray-800 text-white border-gray-700'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>


          <h1 className='poppins scroll-m-20 text-white text-center text-2xl md:text-4xl font-extrabold tracking-tight'>ORIANA</h1>
          
          {/* Right side icons */}
          <div className='flex items-center gap-4'>
            
            <button className="md:hidden text-white">
              <FaSearch size={20} />
            </button>

            <Link href={"/wishlist"} className='hidden md:flex items-center gap-2 text-white'>
              <FaHeart />
              <p className="hidden lg:block">WishList</p>
            </Link>

            {
              session && (
                <Link href={"/cart"} className="hidden md:flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
                  <div className="relative">
                    <FaShoppingBag className="w-5 h-5" />
                    {isMounted && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm">
                        {cartItemCount}
                      </div>
                    )}
                  </div>
                  <p className="hidden lg:block text-sm font-medium">Cart</p>
                </Link>
              )
            }
            
            <div className="hidden md:block">
              <ModeToggle />
            </div>
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={session.user.image ? session.user.image : ""} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='poppins'>
                  <DropdownMenuItem>
                    {session.user.name}
                  </DropdownMenuItem>
                  {
                    session.user.role === "Admin" ? (
                      <DropdownMenuItem>
                        <Link href={"/dashboard"}>
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      ""
                    )
                  }
                  <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="default">Login</Button>
              </Link>
            )}
            
          </div>
        </div>

        
        <div className="md:hidden container mx-auto px-4 mt-3">
          <div className="relative">
            <Input 
              type='text' 
              placeholder='Search...' 
              className='w-full pr-10 bg-gray-800 text-white border-gray-700'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>
    
      
      <div className='hidden md:flex items-center justify-center gap-10 py-4 bg-white dark:bg-[#0D1117]'>
        {navLinks.map((link) => (
          <Link href={link.href} key={link.label}>
            <p className='poppins font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>{link.label}</p>
          </Link>
        ))}
      </div>

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0D1117] py-4 shadow-lg">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                href={link.href} 
                key={link.label}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <p className='poppins font-bold text-gray-800 dark:text-white'>{link.label}</p>
              </Link>
            ))}
            
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-3">
              <Link 
                href={"/wishlist"} 
                className='flex items-center gap-2 text-gray-800 dark:text-white'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaHeart />
                <p>WishList</p>
              </Link>

              {

              }
              
              <div className="pt-2">
                <ModeToggle />
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar