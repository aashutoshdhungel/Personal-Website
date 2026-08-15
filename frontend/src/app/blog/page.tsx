import type { Metadata } from "next"
import BlogClient from "./BlogClient"

export const metadata: Metadata = {
  title: "Pokedex",
  description:
    "Reflections on medicine, biology, poetry, and the human story by Aashutosh Dhungel, a medical aspirant from Nepal.",
  alternates: { canonical: "/blog" }
}

export default function Page() {
  return <BlogClient />
}
