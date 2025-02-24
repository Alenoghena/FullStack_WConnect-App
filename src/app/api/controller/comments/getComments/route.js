import { NextResponse } from "next/server";
import Comment from "@/models/Comment";
// import { db } from "@/utils/database";

//Getting all the posts from db

export async function GET(req) {
  // await db.initialize();
  const userId = Number(req.headers.get("userId"));

  if (!userId) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const comments = await Comment.findAll();

  return new NextResponse(JSON.stringify(comments), { status: 201 });
}

//Get one post from db
