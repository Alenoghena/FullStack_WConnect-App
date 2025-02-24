import { NextResponse } from "next/server";
import Comment from "@/models/Comment";

export async function GET(req, { params }) {
  const { postId } = await params;

  if (!postId) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  const comments = await Comment.findAll({
    where: { postId },
  }); //find by primary key

  return new NextResponse(JSON.stringify(comments), { status: 201 });
}
