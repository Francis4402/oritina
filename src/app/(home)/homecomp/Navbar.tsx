"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { 
  FaHeart, 
  FaShoppingBag, 
  FaSearch, 
  FaBars, 
  FaTimes 
} from "react-icons/fa";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { ModeToggle } from '../../utils/ModeToggle';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCartStore } from '@/lib/store';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { getTotalItems } = useCartStore();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/blogs", label: "Blogs" },
    { href: "/aboutus", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/contactus", label: "Contact Us" },
    { href: "/orders", label: "Orders" }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartItemCount = isMounted ? getTotalItems() : 0;

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Navigate to shop page with search query
      router.push(`/shop?name=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
      
      // Reset searching state after navigation
      setTimeout(() => setIsSearching(false), 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#0D1117] shadow-md">
      {/* Top Bar */}
      <div className='bg-[#0D1117] w-full py-3 md:py-4'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between gap-4'>
            {/* Desktop Search - At the start */}
            <div className="hidden md:flex flex-1 max-w-md">
              <form onSubmit={handleSearch} className="relative w-full">
                <Input 
                  type='text' 
                  placeholder='Search products...' 
                  className='w-full pr-10 bg-gray-800 text-white border-gray-700 focus:border-blue-500'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isSearching}
                />
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Brand Logo - Centered */}
            <Link 
              href="/" 
              className="flex-shrink-0 mx-auto md:mx-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <h1 className='poppins text-white text-2xl md:text-3xl font-extrabold tracking-tight hover:opacity-90 transition-opacity'>
                ORIANA
              </h1>
            </Link>

            {/* Action Buttons */}
            <div className='flex items-center gap-3 flex-shrink-0'>
              {/* Wishlist - Hidden on mobile */}
              <Button 
                variant="outline" 
                size="sm"
                className="hidden md:flex items-center gap-2"
                asChild
              >
                <Link href="/wishlist">
                  <FaHeart className="w-4 h-4" />
                  <span className="hidden lg:inline">Wishlist</span>
                </Link>
              </Button>

              {/* Cart */}
              {session && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex items-center gap-2 text-white hover:bg-gray-800"
                  asChild
                >
                  <Link href="/cart" className="relative">
                    <FaShoppingBag className="w-4 h-4" />
                    {isMounted && cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#0D1117]">
                        {cartItemCount}
                      </span>
                    )}
                    <span className="hidden lg:inline text-sm font-medium">Cart</span>
                  </Link>
                </Button>
              )}

              {/* Theme Toggle */}
              <div className="hidden md:block">
                <ModeToggle />
              </div>

              {/* User Menu */}
              {session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                        <AvatarFallback className="bg-blue-600 text-white text-sm">
                          {session.user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='poppins w-48'>
                    <DropdownMenuItem className="flex flex-col items-start cursor-default">
                      <span className="font-semibold">{session.user.name}</span>
                      {/* <span className="text-sm text-gray-500">{session.user.email}</span> */}
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="w-full cursor-pointer">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {session.user.role === "Admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="w-full cursor-pointer">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      onClick={() => signOut({ callbackUrl: "/?status=logged_out" })}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="default" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Search - Visible only on mobile */}
          <div className="md:hidden mt-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input 
                  type='text' 
                  placeholder='Search products...' 
                  className='w-full pr-10 bg-gray-800 text-white border-gray-700'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isSearching}
                />
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex items-center justify-center gap-8 py-3 bg-white dark:bg-[#0D1117] border-t border-gray-200 dark:border-gray-800'>
        {navLinks.map((link) => (
          <Link 
            href={link.href} 
            key={link.label}
            className={`poppins font-semibold transition-colors px-3 py-1 rounded-lg ${
              isActiveLink(link.href)
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950'
                : 'text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0D1117] border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-3">
            {/* Mobile Navigation Links */}
            <div className="grid gap-1 mb-4">
              {navLinks.map((link) => (
                <Link 
                  href={link.href} 
                  key={link.label}
                  onClick={handleMobileLinkClick}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActiveLink(link.href)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950'
                      : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className='poppins font-semibold'>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/wishlist" onClick={handleMobileLinkClick}>
                  <FaHeart className="w-4 h-4 mr-2" />
                  Wishlist
                </Link>
              </Button>
              
              {session && (
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/cart" onClick={handleMobileLinkClick}>
                    <div className="relative mr-2">
                      <FaShoppingBag className="w-4 h-4" />
                      {isMounted && cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                          {cartItemCount}
                        </span>
                      )}
                    </div>
                    Cart ({cartItemCount})
                  </Link>
                </Button>
              )}

              <div className="flex justify-center pt-2">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;