import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to the users.json file
const usersFilePath = path.join(process.cwd(), "users.json");

// Function to read users from file
function readUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
}

// Function to write users to file
function writeUsers(users: any[]) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing users file:", error);
  }
}

// Forgot Password Handler
export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    let users = readUsers();
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate reset token
    const resetToken = Math.random().toString(36).substring(2);
    user.resetToken = resetToken;
    user.tokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    writeUsers(users);

    const resetLink = `http://localhost:3000/resetpassword?token=${resetToken}`;
    
    console.log("Generated Reset Link:", resetLink); // Debugging

    return NextResponse.json({
      message: "Reset link generated. Check console.",
      resetLink,
    });
  } catch (error) {
    console.error("Error in Forgot Password API:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
