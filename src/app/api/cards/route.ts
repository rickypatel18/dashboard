import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = {
      customers: [
        { months: "1-2", customer: 180 },
        { months: "3-4", customer: 350 },
        { months: "5-6", customer: 880 },
        { months: "7-8", customer: 420 },
        { months: "9-10", customer: 600 },
        { months: "11-12", customer: 720 },
      ],
      orders: [
        { months: "1-2", order: 5100 },
        { months: "3-4", order: 3900 },
        { months: "5-6", order: 4700 },
        { months: "7-8", order: 4600 },
        { months: "9-10", order: 3800 },
        { months: "11-12", order: 3400 },
      ],
      revenue: [
        { months: "1-2", revenue: 7400 },
        { months: "3-4", revenue: 4800 },
        { months: "5-6", revenue: 3600 },
        { months: "7-8", revenue: 4100 },
        { months: "9-10", revenue: 4400 },
        { months: "11-12", revenue: 5500 },
      ],
      profits: [
        { months: "1-2", profit: 4200 },
        { months: "3-4", profit: 4400 },
        { months: "5-6", profit: 7300 },
        { months: "7-8", profit: 4600 },
        { months: "9-10", profit: 5100 },
        { months: "11-12", profit: 4500 },
      ],
    };
    
    
    return NextResponse.json(data);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
