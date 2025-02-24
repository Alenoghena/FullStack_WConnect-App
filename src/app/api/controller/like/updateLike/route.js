import { NextResponse } from "next/server";
import Like from "@/models/Like";
// import { db } from "@/utils/database";
//create new like

export async function PATCH(req) {
  // await db.initialize();
  //   const PostId = req.body.PostId;
  //   const likeStatus = req.body.likeStatus;
  // const UserId = req.id;
  const { PostId, likeStatus } = await req.json();

  const userId = Number(req.headers.get("user-id"));
  if (!userId && !PostId && !likeStatus) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }));
  }
  const foundLike = await Like.findOne({
    where: { userId, postId: PostId },
  });

  foundLike && (foundLike.likeStatus = likeStatus);

  await foundLike?.save();

  return new NextResponse(JSON.stringify(foundLike), { status: 201 });
}
