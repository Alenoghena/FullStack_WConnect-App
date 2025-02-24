import { NextResponse } from "next/server";
import Post from "@/models/Post";

//Get one post from db

export async function GET(req, { params }) {
  const { postId: id } = await params;

  // const { id } = await params;
  const post = await Post.findByPk(id); //find by primary key

  return new NextResponse(JSON.stringify(post), { status: 201 });
}
