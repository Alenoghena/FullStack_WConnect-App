import { NextResponse } from "next/server";
import Comment from "@/models/Comment";

//Getting all the posts from db

export async function GET(req, { params }) {
  const { postId } = await params;
  console.log("postId comments...", postId);

  if (!postId) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const comments = await Comment.findAll({ where: { postId } });

  return new NextResponse(JSON.stringify(comments), { status: 201 });
}

//Get one post from db
