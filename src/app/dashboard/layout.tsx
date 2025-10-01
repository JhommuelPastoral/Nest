"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { SessionProvider } from "next-auth/react"
import { useEffect } from "react"
import AOS from "aos";
import "aos/dist/aos.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, [])
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-row flex-1 md:flex" >
        <SidebarTrigger className="cursor-pointer"/>

        <div className="w-full">
          <SessionProvider>
            {children}
          </SessionProvider>

        </div>
      </main>
    </SidebarProvider>
  )
}