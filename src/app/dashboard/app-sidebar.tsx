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

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
  const { open } = useSidebar()

  return (
    <Sidebar collapsible="icon" className="bg-white border-r">
      {/* Logo/Header */}
      <SidebarHeader>
        <div className="flex items-center justify-center">
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
        </div>
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
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 transition rounded-md hover:bg-gray-100 hover:text-black"
                    >
                      {/* Tooltip wrapper when closed */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2">
                            <item.icon className="w-5 h-5 text-gray-500" />
                            {open && <span>{item.title}</span>}
                          </div>
                        </TooltipTrigger>
                        {!open && (
                          <TooltipContent side="right">
                            {item.title}
                          </TooltipContent>
                        )}
                      </Tooltip>

                      {open && item.badge && (
                        <span className="ml-auto rounded-md bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600">
                          {item.badge}
                        </span>
                      )}
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
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 transition rounded-md hover:bg-gray-100 hover:text-black"
                    >
                      <Tooltip>
                        <TooltipTrigger >
                          <div className="flex items-center gap-2">
                            <item.icon className="w-5 h-5 text-gray-500" />
                            {open && <span>{item.title}</span>}
                          </div>
                        </TooltipTrigger>
                        {!open && (
                          <TooltipContent side="right">
                            {item.title}
                          </TooltipContent>
                        )}
                      </Tooltip>
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
