"use client";

import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/dashboard");
  // redirect("/dashboard/crm"); //if serverside
}
