import { NextResponse } from "next/server";

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@mail.com", amount: "500.00", status: "Done", location: "New York" },
  { id: 2, name: "Bob Smith", email: "bob@mail.com", amount: "750.00", status: "Pending", location: "Los Angeles" },
  { id: 3, name: "Charlie Brown", email: "charlie@mail.com", amount: "900.00", status: "Done", location: "Chicago" },
  { id: 4, name: "David Wilson", email: "david@mail.com", amount: "600.00", status: "Pending", location: "Houston" },
  { id: 5, name: "Emma Watson", email: "emma@mail.com", amount: "820.00", status: "Done", location: "Phoenix" },
  { id: 6, name: "Franklin Lee", email: "franklin@mail.com", amount: "1,200.00", status: "Pending", location: "Seattle" },
  { id: 7, name: "Grace Adams", email: "grace@mail.com", amount: "980.00", status: "Done", location: "Boston" },
  { id: 8, name: "Henry Ford", email: "henry@mail.com", amount: "450.00", status: "Pending", location: "San Francisco" },
  { id: 9, name: "Isabella White", email: "isabella@mail.com", amount: "700.00", status: "Done", location: "Denver" },
  { id: 10, name: "Jack Green", email: "jack@mail.com", amount: "1,000.00", status: "Pending", location: "Miami" },
  { id: 11, name: "Karen Black", email: "karen@mail.com", amount: "300.00", status: "Done", location: "Dallas" },
  { id: 12, name: "Louis Turner", email: "louis@mail.com", amount: "650.00", status: "Pending", location: "Austin" },
  { id: 13, name: "Maria Clark", email: "maria@mail.com", amount: "850.00", status: "Done", location: "San Diego" },
  { id: 14, name: "Nathan Scott", email: "nathan@mail.com", amount: "500.00", status: "Pending", location: "Portland" },
  { id: 15, name: "Olivia Harris", email: "olivia@mail.com", amount: "920.00", status: "Done", location: "Las Vegas" },
  { id: 16, name: "Peter Evans", email: "peter@mail.com", amount: "1,100.00", status: "Pending", location: "Philadelphia" },
  { id: 17, name: "Quincy Baker", email: "quincy@mail.com", amount: "470.00", status: "Done", location: "Atlanta" },
  { id: 18, name: "Rachel King", email: "rachel@mail.com", amount: "750.00", status: "Pending", location: "Minneapolis" },
  { id: 19, name: "Samuel Young", email: "samuel@mail.com", amount: "680.00", status: "Done", location: "Nashville" },
  { id: 20, name: "Tina Brooks", email: "tina@mail.com", amount: "800.00", status: "Pending", location: "New Orleans" },
  { id: 21, name: "Umar Reed", email: "umar@mail.com", amount: "1,300.00", status: "Done", location: "Kansas City" },
  { id: 22, name: "Victoria Hall", email: "victoria@mail.com", amount: "900.00", status: "Pending", location: "St. Louis" },
  { id: 23, name: "William Allen", email: "william@mail.com", amount: "520.00", status: "Done", location: "Indianapolis" },
  { id: 24, name: "Xavier Carter", email: "xavier@mail.com", amount: "780.00", status: "Pending", location: "Charlotte" },
  { id: 25, name: "Yasmine Wright", email: "yasmine@mail.com", amount: "970.00", status: "Done", location: "Detroit" },
  { id: 26, name: "Zachary Moore", email: "zachary@mail.com", amount: "600.00", status: "Pending", location: "Memphis" },
  { id: 27, name: "Anna Parker", email: "anna@mail.com", amount: "750.00", status: "Done", location: "Oklahoma City" },
  { id: 28, name: "Brian Edwards", email: "brian@mail.com", amount: "900.00", status: "Pending", location: "Louisville" },
  { id: 29, name: "Catherine Sanchez", email: "catherine@mail.com", amount: "820.00", status: "Done", location: "Baltimore" },
  { id: 30, name: "Daniel Thompson", email: "daniel@mail.com", amount: "500.00", status: "Pending", location: "Milwaukee" },
  { id: 31, name: "Elaine Foster", email: "elaine@mail.com", amount: "1,000.00", status: "Done", location: "Providence" },
  { id: 32, name: "Felix Ward", email: "felix@mail.com", amount: "600.00", status: "Pending", location: "Salt Lake City" },
  { id: 33, name: "Georgia Simmons", email: "georgia@mail.com", amount: "720.00", status: "Done", location: "Buffalo" },
  { id: 34, name: "Harold Hughes", email: "harold@mail.com", amount: "880.00", status: "Pending", location: "Birmingham" },
  { id: 35, name: "Irene Douglas", email: "irene@mail.com", amount: "940.00", status: "Done", location: "Raleigh" },
  { id: 36, name: "James Peterson", email: "james@mail.com", amount: "460.00", status: "Pending", location: "Richmond" },
  { id: 37, name: "Katherine Ross", email: "katherine@mail.com", amount: "890.00", status: "Done", location: "Hartford" },
  { id: 38, name: "Leon Scott", email: "leon@mail.com", amount: "750.00", status: "Pending", location: "Springfield" },
  { id: 39, name: "Melissa Jenkins", email: "melissa@mail.com", amount: "600.00", status: "Done", location: "Anchorage" },
  { id: 40, name: "Nathaniel Russell", email: "nathaniel@mail.com", amount: "800.00", status: "Pending", location: "Fargo" },
  { id: 41, name: "Olivia Bennett", email: "olivia@mail.com", amount: "930.00", status: "Done", location: "Boise" },
  { id: 42, name: "Patrick Fisher", email: "patrick@mail.com", amount: "770.00", status: "Pending", location: "Des Moines" },
  { id: 43, name: "Quinn Parker", email: "quinn@mail.com", amount: "980.00", status: "Done", location: "Little Rock" },
  { id: 44, name: "Rebecca Coleman", email: "rebecca@mail.com", amount: "820.00", status: "Pending", location: "Topeka" },
  { id: 45, name: "Steve Murphy", email: "steve@mail.com", amount: "690.00", status: "Done", location: "Madison" },
];

export async function GET() {
  return NextResponse.json({ users });
}



