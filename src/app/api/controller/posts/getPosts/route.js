import { NextResponse } from "next/server";
import Post from "@/models/Post";
// import { db } from "@/utils/database";

//Getting all the posts from db
export async function GET(req) {
  // const userId = Number(req.headers.get("user-id"));
  // if (!userId) {
  //   return new NextResponse(JSON.stringify({ message: "Not authorized" }));
  // }
  const posts = await Post.findAll();

  return new NextResponse(JSON.stringify(posts), { status: 201 });
}
