import { NextResponse } from "next/server";
import Post from "@/models/Post";
// import { db } from "@/utils/database";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("userId"));

  // const { userId } = await params;
  // const userId = req.params.userId;
  //Get userId from middleware
  // const userId = await req.json();

  const posts = await Post.findAll({ where: { userId } }); //find by primary key

  return new NextResponse(JSON.stringify(posts), { status: 201 });
}
