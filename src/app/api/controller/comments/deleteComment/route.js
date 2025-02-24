import { NextResponse } from "next/server";
import Comment from "@/models/Comment";
// import { db } from "@/utils/database";

export async function DELETE(req) {
  // await db.initialize();
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  //From middleware
  const userId = Number(req.headers.get("user-id"));

  await Comment.destroy({ where: { id, userId } }); //find by primary key

  return new NextResponse(
    JSON.stringify({ success: "comment successfully destroyed!" }),
    { status: 201 }
  );
}
