import { NextResponse } from "next/server";

import Post from "@/models/Post";
// import { db } from "@/utils/database";

//create new post
export async function POST(req) {
  console.log("Is this..............?", req.headers.get("title"));
  // const title = req.headers.get("title");
  // const postText = req.headers.get("postText");
  // const username = req.headers.get("username");
  // const userId = Number(req.headers.get("userId"));
  const { title, postText, username, userId } = await req.json();

  console.log("null??????????????????", title, postText, username);
  const post = await Post.create({
    title,
    postText,
    userId,
    username,
  });

  return new NextResponse(JSON.stringify(post), { status: 201 });
}
