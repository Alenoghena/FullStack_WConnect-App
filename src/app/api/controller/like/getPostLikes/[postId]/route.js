import { NextResponse } from "next/server";
import Like from "@/models/Like";

export async function GET(req, { params }) {
  //   const PostId = req.params.postId;
  const { postId } = await params;

  const userId = Number(req.headers.get("userId"));
  console.log("postId likes...", postId, userId);
  //   const postId = Number(req.headers.get("user-id"));

  const likes = await Like.findAll({
    where: { postId, userId },
  }); //find by primary key

  return new NextResponse(JSON.stringify(likes), { status: 201 });
}
