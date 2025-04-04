import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "users.json");

// Read users from file
function readUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function POST(req: Request) {
  try {
    const { email, role, password } = await req.json();

    if (!email || !role || !password) {
      return NextResponse.json(
        { message: "Email and password required." },
        { status: 400 }
      );
    }

    const users = readUsers();
    const user = users.find(
      (user: any) =>
        user.email === email && user.role === role && user.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Remove password before sending response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          email: user.email,
          name: user.name,
          designation: user.designation,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
