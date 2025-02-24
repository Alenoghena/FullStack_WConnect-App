import { NextResponse } from "next/server";
import Comment from "@/models/Comment";
// import { db } from "@/utils/database";

//create new comment
export async function POST(req) {
  // await db.initialize();
  // req from body
  const comment = await req.json();

  await Comment.create(comment);

  return new NextResponse(JSON.stringify(comment), { status: 201 });
}
