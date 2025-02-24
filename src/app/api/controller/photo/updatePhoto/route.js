import Photo from "@/models/Photo";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

// const path = require("path");
const fsPromises = fs.promises;

export async function PATCH(req) {
  //   const UId = req.id;
  // const userId = Number(req.headers.get("user-id"));
  // const data = await req.formData();

  const userId = Number(req.headers.get("userId"));

  const formData = await req.formData();
  const photo = formData.get("file");
  // console.log("photo and userid .... /////////???", photo.name, userId);
  if (!photo) {
    return NextResponse.json({ success: false });
  }

  const buffer = Buffer.from(await photo.arrayBuffer());
  const filename = Date.now() + photo.name.replaceAll(" ", "_");

  // console.log("Typeof......", typeof filename, filename);
  if (!userId) {
    return new NextResponse(
      JSON.stringify({ message: "creating new Photos is Not Authorized" }),
      { status: 401 }
    );
  }
  const foundPhoto = await Photo.findOne({
    where: { userId },
  });

  if (foundPhoto?.profilePhoto) {
    //remove the file from public/images/name-the name stored in db
    fsPromises.rm(path.join("public", "images", foundPhoto.profilePhoto));
    foundPhoto.profilePhoto = filename;
    await foundPhoto.save();
    await writeFile(path.join("public", "images", filename), buffer);
  }
  return new NextResponse(
    JSON.stringify({
      message: "Photo updated successfully",
      UserId: foundPhoto?.userId,
    }),
    { status: 201 }
  );
}
