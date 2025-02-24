import Photo from "@/models/Photo";
// import { db } from "@/utils/database";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  // await db.initialize();
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("user-id"));
  if (!userId) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  await Photo.destroy({ where: { userId } }); //find by primary key

  return new NextResponse(
    JSON.stringify({ message: "Photo successfully destroyed!" }),
    { status: 201 }
  );
}
