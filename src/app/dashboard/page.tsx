"use client"

import { useSession } from "next-auth/react"
import Loading from "./loading"
import { Mail, Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input";
export default function Dashboard() {
  const { data: session } = useSession()

  if (!session) return <Loading />
  console.log(session);
  return (
    <>
      <header className="flex items-center justify-between px-10 py-2 font-nunito">
        <div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input 
              type="text" 
              placeholder="Search..." 
              className="pl-10" // add left padding so text doesn't overlap the icon
            />
          </div>

        </div>
        <div className="flex items-center gap-10">
          <Mail className="w-5 h-5 cursor-pointer" />
          <Bell className="w-5 h-5 cursor-pointer"/>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
              <AvatarFallback>
                {session.user?.name?.charAt(0) || ""}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-bold">{session.user?.name}</span>
              <span className="text-sm text-gray-500">{session.user?.email}</span>
            </div>
            
          </div>
        </div>
      </header>
    
    
    </>
  )
}
