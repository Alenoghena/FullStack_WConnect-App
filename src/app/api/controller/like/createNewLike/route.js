import { NextResponse } from "next/server";
import Like from "@/models/Like";
// import { db } from "@/utils/database";

//create new like

export async function POST(req) {
  // await db.initialize();
  //   request from body
  const { PostId: postId, likeStatus: like } = await req.json();

  //From from middleware
  const userId = Number(req.headers.get("user-id"));

  if (!userId && !postId) {
    return new NextResponse(
      JSON.stringify({ message: "creating new Likes is Not Authorized" }),
      { status: 401 }
    );
  }
  const newLike = await Like.create({
    userId,
    postId,
    likeStatus: like,
  });
  return new NextResponse(
    JSON.stringify({
      message: "liked successfully",
      id: newLike.id,
      UserId: newLike.userId,
      likeStatus: newLike.likeStatus,
      PostId: newLike.postId,
    }),
    { status: 201 }
  );
}
