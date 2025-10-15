import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params} : {params: Promise< {journalId: string}>}) {
  try {
    const { journalId } =  await params;
    if(!journalId) return NextResponse.json({error: "Missing journalId"}, {status: 400});
    const {title, content, mood, wordsCount} = await req.json();

    if(!title || !content || !mood) return NextResponse.json({error: "Missing title, content, or mood"}, {status: 400});

    await prisma.post.update({where: {id: journalId}, data: {title, content, mood, wordsCount}});
    return NextResponse.json({message: "Journal updated successfully"}, {status: 200});

  } catch (error) {
    console.log("Update journal error:", error);
    return NextResponse.json({error: "Something went wrong"}, {status: 500});
  }
}