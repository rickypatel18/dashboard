import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const usersFilePath = path.resolve(process.cwd(), "users.json");


async function readUsers() {
    try {
        const data = await fs.readFile(usersFilePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading users file:", error);
        return [];
    }
}

// Function to write users to file (Async)
async function writeUsers(users: any[]) {
    try {
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf8");
    } catch (error) {
        console.error("Error writing users file:", error);
    }
}

// DELETE request to remove user
export async function DELETE(req: Request) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ message: "Email is required." }, { status: 400 });
        }

        let users = await readUsers();
        const filteredUsers = users.filter((user: any) => user.email !== email);

        if (users.length === filteredUsers.length) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }
        await writeUsers(filteredUsers);

        return NextResponse.json({ message: "Account deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
}
