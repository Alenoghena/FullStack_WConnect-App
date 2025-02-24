import { NextResponse } from "next/server";
import Post from "@/models/Post";
// import { db } from "@/utils/database";
//Get one post from db

export async function GET(req) {
  // const id = req.params.id;
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  // const { id } = await params;
  const post = await Post.findByPk(id); //find by primary key

  return new NextResponse(JSON.stringify(post), { status: 201 });
}
