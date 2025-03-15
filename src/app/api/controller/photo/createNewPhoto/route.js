import Photo from "@/models/Photo";
import fs from "fs";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
const path = require("path");
// const fsPromises = fs.promises;
export async function POST(req) {
  const userId = Number(req.headers.get("userId"));
  const formData = await req.formData();

  const photo = formData.get("file");
  console.log("userId and photo......", photo, userId);
  if (!photo) {
    return NextResponse.json({ success: false });
  }

  const buffer = Buffer.from(await photo.arrayBuffer());
  const filename = photo.name.replaceAll(" ", "_");

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ message: "creating new Photos is Not Authorized" }),
      { status: 401 }
    );
  }
  const userPhoto = await Photo.create({
    userId,
    profilePhoto: filename,
  });
  const message = "Photo created successfully";
  await writeFile(path.join("public", "images", filename), buffer);
  return new NextResponse(JSON.stringify({ ...userPhoto, message }), {
    status: 201,
  });
}
