import type { Metadata } from "next"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title: "Trainer Profile",
  description:
    "Learn about Aashutosh Dhungel, a medical aspirant and writer from Arjundhara, Jhapa, Nepal preparing for MBBS with a love for poetry and stories.",
  alternates: { canonical: "/about" }
}

export default function Page() {
  return <AboutClient />
}
