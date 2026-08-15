import type { Metadata } from "next"
import HomeClient from "./HomeClient"

export const metadata: Metadata = {
  title: "Aashutosh Dhungel",
  description:
    "Aashutosh Dhungel is a medical aspirant, poet, and story writer from Jhapa, Nepal, preparing for MBBS while finding meaning in words.",
  alternates: { canonical: "/" }
}

export default function Page() {
  return <HomeClient />
}
