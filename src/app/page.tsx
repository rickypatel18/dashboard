"use client";

import { redirect, useRouter } from "next/navigation";

const router = useRouter();

export default function Home() {
  router.push("/dashboard/crm");
  // redirect("/dashboard/crm"); //if serverside
}
