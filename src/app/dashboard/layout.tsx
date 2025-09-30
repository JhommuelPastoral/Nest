import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { SessionProvider } from "next-auth/react"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1" >
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