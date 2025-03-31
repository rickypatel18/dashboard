import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = {
      customers: [
        { months: "1-2", customer: 200 },
        { months: "3-4 ", customer: 370 },
        { months: " 5-6", customer: 900 },
        { months: "7-8", customer: 294 },
        { months: "9-10", customer: 546 },
        { months: "11-12", customer: 601 },
      ],
      orders: [
        { months: "1-2", order: 4908 },
        { months: "3-4", order: 3800 },
        { months: " 5-6", order: 4800 },
        { months: "7-8 ", order: 4200 },
        { months: "9-10", order: 3708 },
        { months: "11-12 ", order: 3500 },
      ],
      revenue: [
        { months: "1-2 ", revenue: 6900 },
        { months: "3-4 ", revenue: 4498 },
        { months: " 5-6", revenue: 3500 },
        { months: "7-8", revenue: 3708 },
        { months: "9-10 ", revenue: 3908 },
        { months: "11-12 ", revenue: 5000 },
      ],
      profits: [
        { months: "1-2", profit: 3708 },
        { months: "3-4 ", profit: 3908 },
        { months: " 5-6", profit: 6900 },
        { months: "7-8", profit: 4100 },
        { months: "9-10", profit: 4908 },
        { months: "11-12", profit: 4100 },
      ],
    };

    return NextResponse.json(data);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
