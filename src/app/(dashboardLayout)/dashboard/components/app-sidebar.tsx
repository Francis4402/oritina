"use client"

import * as React from "react"
import {
  GitFork,
  LayoutDashboard,
  MessageSquare,
  Package,
  ShoppingBag,
  SquareTerminal,
  Table,
} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"



const data = {

  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "All Products",
      url: "/dashboard/products",
      icon: ShoppingBag,
    },
    {
      name: "Blogs",
      url: "/dashboard/blogs",
      icon: SquareTerminal,
    },
    {
      name: "Categories",
      url: "/dashboard/category",
      icon: GitFork
    },
    {
      name: "Product-Comments",
      url: "/dashboard/proudct-comments",
      icon: Package
    },
    {
      name: "Blog-Comments",
      url: "/dashboard/blog-comments",
      icon: MessageSquare
    },
    {
      name: "Orders",
      url: "/dashboard/orders",
      icon: Table
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const {data: session} = useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <div className="rounded-full bg-black p-2">
                  <Image src={'/vercel.svg'} alt="logo" width={25} height={25} />
                </div>
                <span className="text-xl font-semibold">ORITINA</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
