import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Cookies from "js-cookie";
// import { db } from "@/utils/database";

export async function GET(req) {
  // const requestHeaders = new Headers(req.headers);
  // const headerList = await headers();
  // console.log(headerList.get("Authorization"));
  // console.log(requestHeaders.get("Authorization"));
  const cookie = req.headers.get("authorization");
  const email = await req.headers.get("email"); //from verifyJWT
  console.log("cookies and email....? ", cookie, email);
  //if no cookies,no need to check cookies.jwt
  if (!cookie)
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    }); //successful but no content to send back

  const refreshToken = cookie.split(" ")[1].split(".")[0];

  //Is refreshToken in the database?
  const foundUser = await User.findOne({ where: { email, refreshToken } });

  if (!foundUser) {
    //clear the cookie
    Cookies.remove({ name: "jwt", httpOnly: true }); //Use this with https: { httpOnly: true, sameSite: "None", secure: true }
    return new NextResponse(null, { status: 204 }); //successful but no content
  }

  Cookies.remove({ name: "jwt", httpOnly: true, secure: true }); //on production, set secure:true to work only on https:{httpOnly:true, secure: true}
  // (await cookies()).delete({ name: "jwt", httpOnly: true, secure: true }); //on production, set secure:true to work only on https:{httpOnly:true, secure: true}

  return new NextResponse(JSON.stringify({ message: "Deleted successfully" }), {
    status: 201,
  }); //No content to send back =>status:204
}
