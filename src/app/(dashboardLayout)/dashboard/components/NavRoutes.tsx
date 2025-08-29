/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const NavRoutes = ({ item }: { item: any }) => {

    const pathname = usePathname();

  return (
    <Link key={item.name} href={item.href} className={
        classNames(
          pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
          'rounded-md px-3 py-2 text-sm font-medium'
        )
      }>
        {item.name}
    </Link>
  )
}

export default NavRoutes
