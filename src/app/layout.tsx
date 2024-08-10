import type { Metadata, Viewport } from "next"
//import { Inter } from "next/font/google";
import "./globals.css"
import Footer from "@/components/footer"
import Head from "next/head"
// import Header from "@/components/header";
import SignUp from "../components/signUp"
//const inter = Inter({ subsets: ["latin"] });
import { Fira_Sans } from "next/font/google"

const fira_sans = Fira_Sans({
	weight: "800",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-fira",
})

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	//maximumScale: 1,
	userScalable: true,
	// Also supported by less commonly used
	// interactiveWidget: 'resizes-visual',
}

export const metadata: Metadata = {
	title: "Florida Cannabis News | Lookup State Representatives",
	description:
		"Bringing you the latest Cannabis related news and information about recent changes in drug laws affecting Florida. We also make it easy to Lookup your State Representatives and contact them via USPS in just a few clicks.",

	metadataBase: new URL("https://floridablaze.io"),
	alternates: {
		canonical: `/`,
		// 	languages: {
		// 		"en-US": "/en-US",
		// 	},
	},

	openGraph: {
		title: "Florida Cannabis News | Lookup State Representatives",
		description:
			"Bringing you the latest Cannabis related news and information about recent changes in drug laws affecting Florida. We also make it easy to Lookup your State Representatives and contact them via USPS in just a few clicks.",
		url: `https://floridaBlaze.io`,
		siteName: "FloridaBlaze",
		images: [
			{
				url: "https://weedblogimages.s3.amazonaws.com/company_logo.png", // Must be an absolute URL
				width: 285,
				height: 35,
			},
		],
		locale: "en_US",
		type: "article",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<Head>
				{/* <script src="https://apis.google.com/js/platform.js" async defer></script> */}

				<meta name="robots" content="index,follow" />
				{/* <link
          rel="stylesheet"
          href="node_modules/modern-normalize/modern-normalize.css"
        ></link> */}
			</Head>
			<body className={`${fira_sans.variable}`}>
				{/* <Header /> */}
				{children}
				{/* @ts-expect-error Server Component */}
				<SignUp />
				<Footer />
			</body>
		</html>
	)
}
