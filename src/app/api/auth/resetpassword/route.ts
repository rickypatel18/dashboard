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

// Reset Password Handler
export async function PUT(req: Request) {
  try {
    const { token, newPassword } = await req.json();
    
    let users = readUsers();
    const user = users.find((u: any) => u.resetToken === token && u.tokenExpiry > Date.now());

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    // Update password and remove reset token
    user.password = newPassword;
    delete user.resetToken;
    delete user.tokenExpiry;
    writeUsers(users);

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in Reset Password API:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
