import Photo from "@/models/Photo";
// import { db } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req) {
  const photos = await Photo.findAll();

  return new NextResponse(JSON.stringify(photos), { status: 201 });
}
