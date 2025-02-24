import { NextResponse } from "next/server";
import Post from "@/models/Post";
// import { db } from "@/utils/database";

// type Params = {
//   params: Promise<{ id: string }>;
// };
export async function DELETE(req, { params }) {
  // const { id } = await params;
  // const id = req.params.id;
  const { postId: id } = await params;
  //   const { searchParams } = new URL(req.url);
  //   const id = Number(searchParams.get("id"));

  const userId = Number(req.headers.get("userId"));

  if (!userId && !id) {
    return new NextResponse(
      JSON.stringify({ success: "No commentId or postId!" }),
      { status: 401 }
    );
  }
  await Post.destroy({ where: { id, userId } }); //find by primary key

  return new NextResponse(
    JSON.stringify({ success: "Post successfully destroyed!" }),
    { status: 201 }
  );
}
