import type { Metadata } from "next"
import { Press_Start_2P, VT323 } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { SoundProvider } from "@/components/SoundProvider"
import KonamiCode from "@/components/Konamicode"
import AmbientPokemon from "@/components/AmbientPokemon"

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
})

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
})

const SITE_NAME = "Aashutosh Dhungel"
const SITE_URL = "https://aashutoshdhungel.com.np"
const DEFAULT_DESC =
  "Medical aspirant, poet, and story writer from Jhapa, Nepal, reimagined as an interactive Pokedex portfolio."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}, Medical Aspirant and Writer`,
    template: `%s | ${SITE_NAME}`
  },
  description: DEFAULT_DESC,
  keywords: [
    "Aashutosh Dhungel",
    "medical aspirant",
    "MBBS",
    "Nepal",
    "poetry",
    "writing",
    "biology",
    "Jhapa",
    "pokemon portfolio"
  ],
  authors: [{ name: "Aashutosh Dhungel", url: SITE_URL }],
  creator: "Aashutosh Dhungel",
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.png"
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME}, Medical Aspirant and Writer`,
    description: DEFAULT_DESC,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/pfp.jpeg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}, Medical Aspirant and Writer from Nepal`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}, Medical Aspirant and Writer`,
    description: DEFAULT_DESC,
    images: ["/pfp.jpeg"]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pressStart.variable} ${vt323.variable}`}>
      <body>
        <ThemeProvider>
          <SoundProvider>
            <Navbar />
            {children}
            <Footer />
            <AmbientPokemon />
            <KonamiCode />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}