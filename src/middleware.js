import { NextResponse } from "next/server";
import { expressjwt } from "express-jwt";
import util from "util";
import nextConfig from "../next.config.mjs";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://www.yoursite.com", "https://yoursite.com"]
    : ["http://localhost:3000", "http://localhost:3001"];

const { secret } = nextConfig.serverRuntimeConfig;

export async function middleware(req, res) {
  //  await jwtMiddleware(req);

  const origin = req.headers.get("origin");
  console.log("origin ********:", origin);
  console.log("origin ********:", req.headers);
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

  //   res.headers.append('Access-Control-Allow-Origin', origin);

  // // add the remaining CORS headers to the response
  // res.headers.append('Access-Control-Allow-Credentials', "true");
  // res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  // res.headers.append(
  //     'Access-Control-Allow-Headers',
  //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  // );

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

/////Keep temporary

// const middleware = expressjwt({
//   secret,
//   algorithms: ["HS256"],
//   //just added=>watch out for this session always
//   credentialsRequired: false,
//   getToken: function fromHeaderOrQuerystring(req) {
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.split(" ")[0] === "Bearer"
//     ) {
//       return req.headers.authorization.split(" ")[1];
//     } else if (req.query && req.query.token) {
//       return req.query.token;
//     }
//     return null;
//   },
// }).unless({
//   path: [
//     // public routes that don't require authentication
//     "/api/createNewUser",
//     // "/api/auth",
//   ],
// });
