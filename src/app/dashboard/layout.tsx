import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { SessionProvider } from "next-auth/react"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col flex-1" >
        <SidebarTrigger />
        <SessionProvider>
            {children}
        </SessionProvider>
      </main>
    </SidebarProvider>
  )
}