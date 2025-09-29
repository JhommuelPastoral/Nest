"use client"

import {

  Calendar,
  Home,
  Inbox,
  Settings,
  HelpCircle,
  LogOut,
  BarChart3,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
  
} from "@/components/ui/sidebar"



import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

// Menu items
const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Tasks", url: "/tasks", icon: Inbox, badge: "12+" },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Team", url: "/team", icon: Users },
]

const generalItems = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
  { title: "Logout", url: "/logout", icon: LogOut },
]



export function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname()
  const [clientPathname, setClientPathname] = useState('')

  useEffect(()=>{
    setClientPathname(pathname);
  }, [pathname]);

  return (
    <Sidebar collapsible="icon" className="bg-white border-r">
      {/* Logo/Header */}
      <SidebarHeader>
        <span className="flex items-center justify-center">
          <Image
            src={"/nest-logo.png"}
            alt="Nest Logo"
            width={50}
            height={50}
            priority
          />
          <span
            className={
              open ? "text-lg font-black font-nunito" : "hidden"
            }
          >
            Nest
          </span>
        </span>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold text-gray-400 uppercase">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2 space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} >
                    <Link
                      href={item.url}
                      className={`flex items-center py-2 text-sm font-semibold transition rounded-md font-nunito 
                      ${
                        clientPathname === item.url
                          ? "text-black font-bold"
                          : "text-gray-500 hover:text-black"
                      }`}                   
                      > 
                        <item.icon />
                        <span>
                          {item.title}
                        </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* General */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 mt-6 text-xs font-semibold text-gray-400 uppercase">
            General
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="mt-2 space-y-1">
              {generalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} >
                    <Link
                      href={item.url}
                      className={`flex items-center py-2 text-sm font-semibold transition rounded-md font-nunito 
                      ${
                        clientPathname === item.url
                          ? "text-black font-bold bg-gray-400/25 hover:bg-gray-400/25"
                          : "text-gray-500 hover:text-black hover:bg-gray-400"
                      }`}                   
                      > 
                          <item.icon />
                          <span>
                            {item.title}
                          </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Promo Card */}
      <SidebarFooter className="px-3 py-4">
        {open && (
          <div className="w-full p-4 text-center text-white bg-green-700 rounded-lg shadow-sm">
            <p className="text-sm font-medium">Download our Mobile App</p>
            <p className="text-xs text-green-100">Get easy in another way</p>
            <button className="w-full px-3 py-1 mt-2 text-sm font-semibold text-green-700 bg-white rounded-md hover:bg-gray-100">
              Download
            </button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
