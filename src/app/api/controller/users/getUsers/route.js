import User from "@/models/User";
// import { db } from "@/utils/database";
import { NextResponse } from "next/server";

//Getting all the posts from db

export async function GET(req) {
  const users = await User.findAll();

  return new NextResponse(JSON.stringify(users), { status: 201 });
}
