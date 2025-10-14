import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params} : {params: Promise< {journalId: string}>}) {
  try {
    const { journalId } =  await params;
    if (!journalId) return NextResponse.json({error: "Missing userId"}, {status: 400});
    await prisma.post.delete({where: {id: journalId}});
    return NextResponse.json({message: "Journal deleted successfully"}, {status: 200});
  } catch (error) {
    console.log("Delete journal error:", error);
    return NextResponse.json({error: "Something went wrong"}, {status: 500});
  }
}