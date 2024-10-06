import { Metadata } from "next";

import HomePage from "@/pages/home";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {

  return (
    <>
      <HomePage />
    </>
  )
}