import { NextResponse } from "next/server";
import Like from "@/models/Like";
// import { db } from "@/utils/database";

export async function GET(req) {
  //   const PostId = req.params.postId;

  const postId = Number(req.headers.get("user-id"));

  const likes = await Like.findAll({ where: { postId } }); //find by primary key

  return new NextResponse(JSON.stringify(likes), { status: 201 });
}
