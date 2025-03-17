import { NextResponse } from "next/server";
import { expressjwt } from "express-jwt";
import util from "util";
import nextConfig from "../next.config.mjs";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://full-stack-w-connect-app.vercel.app",
        "https://yoursite.com",
        "http://localhost:3000",
      ]
    : ["http://localhost:3000", "http://localhost:3001"];

const { secret } = nextConfig.serverRuntimeConfig;

export async function middleware(req, res) {
  const origin = req.headers.get("origin");

  if (origin && allowedOrigins.indexOf(origin) === -1) {
    //!origin blocks thunder client or postman
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const authHeader =
    req.headers.get("Authorization")?.split(" ") ||
    req.headers.get("authorization")?.split(" ");
  //||    req.body.headers.authorization ||    req.params.headers.authorization;
  console.log("authHeader?", req.headers.get("Authorization"));
  if (!(authHeader?.[0] === "Bearer")) {
    NextResponse.json({ message: "not authorized" });
  }
  const token = authHeader?.[1];

  if (!token) {
    NextResponse.json({ message: "not authorized" }); //Unauthorized --res.sendStatus(401)
  }

  const middleware = expressjwt({
    secret,
    algorithms: ["HS256"],
    //just added=>watch out for this session always
    credentialsRequired: true,
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  });

  util.promisify(middleware);

  return NextResponse.next();
}

export const config = {
  matcher: "/api/controller/:path*",
};
