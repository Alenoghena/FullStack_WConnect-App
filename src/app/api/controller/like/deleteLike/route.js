import Like from "@/models/Like";
// import { db } from "@/utils/database";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  // await db.initialize();
  //   const PostId = req.params.postId;
  const { searchParams } = new URL(req.url);
  const postId = Number(searchParams.get("id"));
  const userId = (await req.json()).id;
  if (!userId && !postId) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  await Like.destroy({ where: { postId, userId } }); //find by primary key

  return new NextResponse(
    JSON.stringify({ message: "Like successfully destroyed!" }),
    { status: 201 }
  );
}
