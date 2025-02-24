import { NextResponse } from "next/server";
import Comment from "@/models/Comment";

export async function DELETE(req, { params }) {
  const { commentId } = await params;

  const postId = Number(req.headers.get("postId"));
  console.log("postId", postId, "commentId", commentId);
  if (!commentId && !postId) {
    return new NextResponse(
      JSON.stringify({ success: "No commentId or postId!" }),
      { status: 401 }
    );
  }

  await Comment.destroy({ where: { id: commentId, postId } }); //find by primary key

  return new NextResponse(
    JSON.stringify({ success: "comment successfully destroyed!" }),
    { status: 201 }
  );
}
