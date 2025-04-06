import Photo from "@/models/Photo";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { cloudinary } from "../../../../../../cloudinaryConfig";

const fsPromises = fs.promises;

export async function PATCH(req) {
  //   const UId = req.id;
  // const userId = Number(req.headers.get("user-id"));
  // const data = await req.formData();

  const userId = Number(req.headers.get("userId"));

  const formData = await req.formData();
  const photo = formData.get("file");
  // formData.append("upload_preset", `${process.env.CLOUDINARY_API_PRESET_NAME}`);

  if (!photo) {
    return NextResponse.json({ success: false });
  }
  ///////////////////////////////////////////////////////

  const mimeType = photo.type;
  const encoding = "base64";
  const base64Data = Buffer.from(await photo.arrayBuffer()).toString("base64");

  // this will be used to upload the file
  const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
  //////////////////////////////////////////////////////////
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
    // remove the file from public/images/name-the name stored in db

    // await cloudinary.uploader.destroy(`${foundPhoto.profilePhoto}`);

    fsPromises.rm(path.join("public", "images", foundPhoto.profilePhoto));

    await writeFile(path.join("public", "images", filename), buffer);

    const uploadObj = await cloudinary.uploader.upload(fileUri, {
      overwrite: true,
      use_filename: true,
      unique_filename: true,
      upload_preset: process.env.CLOUDINARY_API_PRESET_NAME,
    });

    const autoCropUrl = cloudinary.url(fileUri, {
      crop: "auto",
      width: "50",
      height: "50",
    });

    console.log("autoCropUrl..///////");
    console.log("autoCropUrl..", autoCropUrl, uploadObj);

    foundPhoto.profilePhoto = uploadObj.secure_url;
    await foundPhoto.save();

    return new NextResponse(
      JSON.stringify({
        ...foundPhoto,
        message: "Photo updated successfully",
      }),
      { status: 201 }
    );
  }
}
