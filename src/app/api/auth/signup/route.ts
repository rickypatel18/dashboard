import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "users.json");

// Function to read users from file
function readUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Function to write users to file
function writeUsers(users: any[]) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
}

export async function POST(req: Request) {
  try {
    const { email, password, name, designation } = await req.json();

    if (!email || !password || !name || !designation) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const users = readUsers();
    const existingUser = users.find((user: any) => user.email === email);

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    const newUser = { email, password, name, designation };
    users.push(newUser);
    writeUsers(users);

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
