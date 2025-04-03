import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = [
      { name: "Jan", Visitor: 2800 },
      { name: "Feb", Visitor: 3000 },
      { name: "Mar", Visitor: 2000 },
      { name: "Apr", Visitor: 2780 },
      { name: "May", Visitor: 1890 },
      { name: "Jun", Visitor: 2390 },
      { name: "Jul", Visitor: 3490 },
      { name: "Aug", Visitor: 3000 },
      { name: "Sep", Visitor: 2000 },
      { name: "Oct", Visitor: 2780 },
      { name: "Nov", Visitor: 1890 },
      { name: "Dec", Visitor: 2390 },
    ];

    return NextResponse.json(data);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
