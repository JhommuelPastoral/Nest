"use client";
import { useParams } from 'next/navigation'

export default function Setting() {
  const params = useParams<{ id: string}>()
 
  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params)

  return <div>Setting page for ID: </div>;
}
