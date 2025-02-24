import { NextResponse } from "next/server";
import Comment from "@/models/Comment";
// import { db } from "@/utils/database";

// type Params = {
//   params: Promise<{ PostId: string }>;
// };

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const postId = Number(searchParams.get("postId"));

  const id = Number(req.headers.get("user-id"));
  if (!id) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  const comments = await Comment.findAll({
    where: { userId: id, postId },
  }); //find by primary key

  return new NextResponse(JSON.stringify(comments), { status: 201 });
}
