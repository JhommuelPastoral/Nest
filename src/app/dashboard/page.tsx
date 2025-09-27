"use client"

import { useSession } from "next-auth/react"
import Loading from "./loading"
export default function Dashboard() {
  const { data: session } = useSession()

  if (!session) return <Loading />

  return <div className="flex flex-1 w-full border border-red-500">Welcome {session.user?.name}</div>
}
