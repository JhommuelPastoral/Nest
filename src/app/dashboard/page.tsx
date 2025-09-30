"use client"

import { useSession } from "next-auth/react"
import Loading from "./loading"
import { Mail, Bell, Search, Plus, MoveUpRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Dashboard() {
  const { data: session } = useSession()

  if (!session) return <Loading />
  
  return (
    <>
      <header className="flex items-center justify-between gap-5 px-2 py-2 md:px-10 font-nunito">
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
              <span className="hidden text-sm font-bold md:block">{session.user?.name}</span>
              <span className="hidden text-sm text-gray-500 md:block">{session.user?.email}</span>
            </div>
            
          </div>
        </div>
      </header>
      <main className="px-2 mt-2 space-y-4 md:px-10 font-nunito">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-500">Plan, priotize, and reflect on your thoughts and experiences.</p>
          </div>
          <Button className="flex items-center gap-2 cursor-pointer group">
            <Plus className="w-4 h-4 group-hover:animate-rotate"/>
            <span >New Journal</span>
          </Button>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 ">

          <Card className="w-full gap-5 shadow-sm rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
            <CardHeader className="flex items-center justify-between">
              <span className="text-lg font-semibold text-white">Total Journals</span>
              <div className="flex items-center justify-center p-1 bg-white rounded-full">
                <MoveUpRight  color="black" size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-5xl font-semibold text-white">24</span>
              <span className="block mt-1 text-sm text-emerald-400">+12% growth</span>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-gray-400">Compared to last 7 days</span>
            </CardFooter>
          </Card>

          <div className="bg-gray-200 "></div>
          <div className="bg-gray-200 "></div>
          <div className="bg-gray-200 "></div>
          <div className="bg-gray-200 "></div>
        </div>

      </main>
    
    </>
  )
}
