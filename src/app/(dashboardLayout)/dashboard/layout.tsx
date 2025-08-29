"use client"

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { usePathname } from 'next/navigation';
import SiteHeader from './components/site-header';

const routeNames: Record<string, string> = {
    "dashboard": "Dashboard",
    "products": "Products", 
    "blogs": "Blogs",
    "category": "Categories",
    "comments": "Comments",
};

const DashboardLayout = ({children}: {children: React.ReactNode}) => {

const pathname = usePathname();
const currentRouteName = routeNames[pathname.split('/').pop() || 'dashboard'] || "Dashboard";

  return (
    <SidebarProvider className='poppins'>
        <AppSidebar/>
        <SidebarInset>
            <SiteHeader currentPage={currentRouteName} />
            {children}
        </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout