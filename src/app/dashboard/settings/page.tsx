"use client";
import { useParams } from 'next/navigation'

export default function Setting() {
  const params = useParams<{ id: string}>()

  console.log(params)

  return <div>Setting page for ID: </div>;
}
