import type { Metadata } from "next"
import NotesClient from "./NotesClient"

export const metadata: Metadata = {
  title: "Item Bag, Study Notes",
  description:
    "Free study notes for Grade 11, Grade 12, and MBBS entrance preparation shared by Aashutosh Dhungel, a medical aspirant from Nepal.",
  alternates: { canonical: "/notes" }
}

export default function Page() {
  return <NotesClient />
}
