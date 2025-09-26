import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const {name, email} = await req.json();
    if(!name || !email) return NextResponse.json({error: "Missing name or email"}, {status: 400});

    // Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if(userExists){
      await prisma.user.update({
        where: {
          id: userExists.id
        },
        data: {
          name: name,
          email: email
        }
      });
      return NextResponse.json({message: "User updated successfully"}, {status: 200});
    }

    // Create user
    await prisma.user.create({
      data: {
        name: name,
        email: email
      }
    });

    return NextResponse.json({message: "User created successfully"}, {status: 200});
  } catch (error) {
    console.log("Create user error:", error);
    return NextResponse.json({error: "Error creating user"}, {status: 500});
  }

}