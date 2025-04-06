import Photo from "@/models/Photo";
import fs from "fs";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { cloudinary } from "../../../../../../cloudinaryConfig";

import path from "path";

// const fsPromises = fs.promises;
export async function POST(req) {
  const userId = Number(req.headers.get("userId"));

  const formData = await req.formData();

  const photo = formData.get("file");

  console.log("userId and photo......", photo, userId);
  if (!photo) {
    return NextResponse.json({ success: false });
  }

  ////////////////////////////////////////////////////
  const mimeType = photo.type;
  const encoding = "base64";
  const base64Data = Buffer.from(await photo.arrayBuffer()).toString("base64");

  // this will be used to upload the file
  const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

  ////////////////////////////////////////////////////
  const buffer = Buffer.from(await photo.arrayBuffer());
  const filename = photo.name.replaceAll(" ", "_");

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ message: "creating new Photos is Not Authorized" }),
      { status: 401 }
    );
  }

  const message = "Photo created successfully";
  await writeFile(path.join("public", "images", filename), buffer);

  const uploadResp = await cloudinary.uploader.upload(fileUri, {
    overwrite: true,
    use_filename: true,
    filename_override: photo.name,
    upload_preset: process.env.CLOUDINARY_API_PRESET_NAME,
  });

  const autoCropUrl = cloudinary.url(fileUri, {
    crop: "auto",
    width: "50",
    height: "50",
  });

  const userPhoto = await Photo.create({
    userId,
    profilePhoto: autoCropUrl.secure_url,
  });
  console.log("autoCropUrl..");

  console.log("autoCropUrl..", autoCropUrl, uploadResp);

  return new NextResponse(JSON.stringify({ ...userPhoto, message }), {
    status: 201,
  });
}
