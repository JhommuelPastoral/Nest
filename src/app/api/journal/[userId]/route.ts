import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params} : {params: Promise< {userId: string}>}) {

  try {
    const { userId } =  await params;
    console.log("User ID:", userId);
    if (!userId) return NextResponse.json({error: "Missing userId"}, {status: 400});
    const journals = await prisma.post.findMany({where: {userId: userId}});
    return NextResponse.json({message: "Journal fetched successfully", journals}, {status: 200});
  } catch (error) {
    console.log("Get journal error:", error);
    return NextResponse.json({error: "Something went wrong"}, {status: 500});
  }

}