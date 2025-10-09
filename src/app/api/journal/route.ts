import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const {title, content, mood, userId} = await req.json();
    if(!title || !content || !mood) return NextResponse.json({error: "Missing title, content, or mood"}, {status: 400});
    await prisma.post.create({data: {title, content, mood, userId, wordsCount: content.length}});
    return NextResponse.json({message: "Journal created successfully"}, {status: 200});
  } catch (error) {
    console.log("Add journal error:", error);
    return NextResponse.json({error: "Something went wrong"}, {status: 500});
  }
}

