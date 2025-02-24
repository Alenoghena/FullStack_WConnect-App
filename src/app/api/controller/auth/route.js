import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { comparingPwd } from "@/lib/pwd";
import Cookies from "js-cookie";
import nextConfig from "../../../../../next.config.mjs";

export async function POST(req) {
  const { email, password } = await req.json();
  console.log(email);
  console.log("this is up..........here?", password, email);
  if (!email || !password) {
    return NextResponse.json({
      message: "username, email and password are required",
    });
  }

  const foundUser = await User.findOne({
    where: { email },
  });
  console.log("user is different?", foundUser);
  if (!foundUser) {
    return new NextResponse(JSON.stringify({ message: "user not found" }), {
      status: 401,
    }); //res.sendStatus(401); //Unauthorized
  }

  //Replaced original with this - match the passwords
  const match = await comparingPwd(foundUser?.password, password);

  if (match) {
    // const roles = Object.values(foundUser.roles);

    // const userTokenInfo = {
    //   UserInfo: { ...foundUser },
    // };

    const userTokenInfo = { ...foundUser };

    //create and send JWT to use in other routes
    //JSON Web Tokens

    const { secret } = nextConfig.serverRuntimeConfig;

    const accessToken = jwt.sign(
      userTokenInfo,
      secret, //process.env.ACCESS_TOKEN_SECRET
      {
        expiresIn: 1200,
      }
    );

    const refreshToken = jwt.sign(
      userTokenInfo,
      secret, // process.env.REFRESH_TOKEN_SECRET
      {
        expiresIn: "1d",
      }
    );

    //Saving refreshToken for currentUser
    foundUser.refreshToken = refreshToken.split(".")[0];
    await foundUser.save();
    console.log(accessToken);
    //send cookie as response
    Cookies.set("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); //{httpOnly: true, maxAge: 24 * 60 * 60 * 1000,sameSite:"None", secure:true}. secure:true for https only
    // const user = { username: foundUser.username, email: foundUser.email };
    //send accessToken in json form as response
    return NextResponse.json({
      accessToken,
      email: foundUser.email,
      username: foundUser.username,
    });
  } else
    return new NextResponse(JSON.stringify({ message: "user not found" }), {
      status: 401,
    }); //Unauthorized
}

//exported to routes/auth.js
// module.exports = { handleLogin };
