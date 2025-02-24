import Photo from "@/models/Photo";
// import { db } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req) {
  const userId = req.headers.get("userId");

  console.log("userId.....", userId);

  const photo = await Photo.findOne({ where: { userId } }); //find by primary key

  return new NextResponse(JSON.stringify(photo), { status: 201 });
}
