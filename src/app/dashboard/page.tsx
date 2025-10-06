"use client"

import { useSession } from "next-auth/react"
import Loading from "./loading"
import { Mail, Bell, Search, MoveUpRight, Flame, Smile, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input";
import Calendar from "./_components/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import ChartBarLabel from "./_components/chart";
import Recent from "./_components/recent";
import NewJournalModal from "./_components/new-journal";
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
      <main className="px-2 pb-10 mt-2 space-y-4 font-nunito">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-500">Plan, priotize, and reflect on your thoughts and experiences.</p>
          </div>

          <NewJournalModal userId={session.user?.id || ""} />
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,250px))] gap-4 justify-center md:justify-start ">

          <Card className="w-full gap-5 shadow-sm rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700" data-aos="fade-right">
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

          {/* Mood Entries */}
          <Card className="w-full gap-5 shadow-sm rounded-2xl bg-gradient-to-r from-slate-500 via-slate-600 to-slate-800" data-aos="fade-right">
            <CardHeader className="flex items-center justify-between">
              <span className="text-lg font-semibold text-white">Mood Entries</span>
              <div className="flex items-center justify-center p-1 bg-white rounded-full">
                <Smile color="black" size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-5xl font-semibold text-white">15</span>
              <span className="block mt-1 text-sm text-emerald-400">+3 this week</span>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-gray-400">Logged moods</span>
            </CardFooter>
          </Card>

          {/* Words Written */}
          <Card className="w-full gap-5 shadow-sm rounded-2xl bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500" data-aos="fade-right">
            <CardHeader className="flex items-center justify-between">
              <span className="text-lg font-semibold text-black">Words Written</span>
              <div className="flex items-center justify-center p-1 bg-white rounded-full">
                <BookOpen color="black" size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-5xl font-semibold text-black">4.2k</span>
              <span className="block mt-1 text-sm text-emerald-800">+9% from last week</span>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-gray-800">Across all journals</span>
            </CardFooter>
          </Card>

          <Card className="w-full gap-5 shadow-sm rounded-2xl bg-gradient-to-r from-neutral-300 to-stone-400" data-aos="fade-right">
            <CardHeader className="flex items-center justify-between">
              <span className="text-lg font-semibold ">Active Streak</span>
              <div className="flex items-center justify-center p-1 bg-white rounded-full">
                <Flame color="black" size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-5xl font-semibold ">7</span>
              <span className="block mt-1 text-sm text-emerald-800">🔥 Keep it up!</span>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-gray-800">Consecutive days journaling</span>
            </CardFooter>
          </Card>
        </div>

        <div className="grid items-start w-full grid-flow-row grid-cols-3 gap-4">
          <div className="h-full col-span-2">
            <ChartBarLabel />
          </div>
          <div className="row-span-2 ">
            <Recent userId={session.user?.id || ""}/>
          </div>
          <div className="w-full h-full max-w-full col-span-2">
            <Calendar/>
          </div>

        </div>


      </main>
    
    </>
  )
}
