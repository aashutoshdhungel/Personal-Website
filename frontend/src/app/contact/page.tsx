import type { Metadata } from "next"
import ContactClient from "./ContactClient"

export const metadata: Metadata = {
  title: "Pokemon Center",
  description:
    "Get in touch with Aashutosh Dhungel. Reach out to talk about medicine, writing, or anything else.",
  alternates: { canonical: "/contact" }
}

export default function Page() {
  return <ContactClient />
}
