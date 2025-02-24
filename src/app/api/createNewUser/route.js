import User from "@/models/User";
// import { createConnection } from "@/utils/database";
import { hashedPassword } from "@/lib/pwd";
import { NextResponse } from "next/server";

//create new comment
export async function POST(req) {
  // const db = await createConnection();
  // if (!db) {
  //   return NextResponse.json("No connection");
  // }
  const { username, email, password } = await req.json();
  console.log("one:", username, email, password);
  if (!username || !email || !password) {
    return new NextResponse(
      JSON.stringify({ message: "username, email and password are required" }),
      { status: 400 }
    );
  }

  console.log("two-three.......:");
  //check for duplicate names in db
  const duplicate = await User.findOne({ where: { username, email } });
  console.log("two:", duplicate);

  if (duplicate)
    return NextResponse.json({
      message: `user ${duplicate.username} exists already!`,
    }); //conflict--res.sendStatus(409);
  try {
    const newUser = {
      username,
      email,
      password: await hashedPassword(password),
      role: "user",
      refreshToken: '"b868072b70a7616b05a"',
    };

    console.log("three:", newUser);
    const createUser = await User.create(newUser);

    console.log("four:", newUser, createUser);

    // return res.status(201).json(newUser);
    return NextResponse.json({
      success: `new user ${newUser.username} created successfully!`,
      status: 201,
    });
  } catch (err) {
    //500 is server error
    new NextResponse(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
