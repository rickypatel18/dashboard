import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 10; // Number of users per page

  const users = Array.from({ length: limit }, (_, i) => ({
    id: (page - 1) * limit + i + 1,
    name: `User ${(page - 1) * limit + i + 1}`,
    email: `user${(page - 1) * limit + i + 1}@mail.com`,
    amount: `$${(Math.random() * 1000).toFixed(2)}`,
    status: Math.random() > 0.5 ? "Active" : "Inactive",
    location: "New York",
  }));

  return NextResponse.json({ users });
}

// const users = [...new Array(limit)].map((_, i) => {
//   const id = (page - 1) * limit + i + 1;
//   return {
//     id,
//     name: `User ${id}`,
//     email: `user${id}@mail.com`,
//     amount: `$${(Math.random() * 1000).toFixed(2)}`,
//     status: Math.random() > 0.5 ? "Active" : "Inactive",
//     location: "New York",
//   };
// });
