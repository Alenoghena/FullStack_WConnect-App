import User from "@/models/User";
// import { db } from "@/utils/database";
import { NextResponse } from "next/server";

//Get one user from db---currently use only this

export async function GET(req) {
  try {
    const email = req.headers.get("email");
    console.log("getUser route:email...", email);
    if (!email) {
      return new NextResponse(JSON.stringify({ message: "Email not found" }), {
        status: 400,
      });
    }

    const user = await User.findOne({ where: { email } }); //find by primary key
    console.log("getUser route:....", user);
    return new NextResponse(JSON.stringify(user), { status: 201 }); //res.status(201).json(user);
  } catch (err) {
    new NextResponse(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
