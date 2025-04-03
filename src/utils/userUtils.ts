import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "users.json");

export function readUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function writeUsers(users: any[]) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
}
