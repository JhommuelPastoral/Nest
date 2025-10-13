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
import { signOut } from "next-auth/react"
// Menu items
const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Journals", url: "/dashboard/journals", icon: Inbox },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Team", url: "/team", icon: Users },
]

const generalItems = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
]

export function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname()
  const [clientPathname, setClientPathname] = useState('')

  useEffect(()=>{
    setClientPathname(pathname);
  }, [pathname]);

  return (
    <Sidebar collapsible="icon" className="border-r bg-gradient-to-r from-gray-50 to-gray-100">
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

      <SidebarContent className="gap-2" >
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
                          ? "text-black font-bold bg-gray-300 "
                          : "text-gray-500 hover:text-black "
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
            <SidebarMenu className="mt-2 space-y-1 ">
              {generalItems.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild tooltip={item.title} >
                    <Link
                      href={item.url}
                      className={`flex items-center py-2 text-sm font-semibold transition rounded-md font-nunito 
                      ${
                        clientPathname === item.url
                          ? "text-black font-bold bg-gray-300"
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
              <SidebarMenuItem>
                <SidebarMenuButton 
                onClick={() => {signOut()}}
                  className="flex items-center py-2 text-sm font-semibold text-gray-500 transition rounded-md cursor-pointer font-nunito hover:text-black">
                    <LogOut />
                    <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Promo Card */}
      <SidebarFooter className="px-3 py-4">
        {open && (
          <div className="w-full p-4 text-center text-white rounded-lg shadow-sm bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
            <p className="text-sm font-medium">Download our Mobile App</p>
            <p className="text-xs text-green-100">Get easy in another way</p>
            <button className="w-full px-3 py-1 mt-2 text-sm font-semibold text-black bg-white rounded-md hover:bg-gray-100">
              Download
            </button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
