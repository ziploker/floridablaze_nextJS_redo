import type { Metadata } from "next"
//import { Inter } from "next/font/google";
import "./globals.css"
import Footer from "@/components/footer"
import Head from "next/head"
// import Header from "@/components/header";

//const inter = Inter({ subsets: ["latin"] });
import { Fira_Sans } from "next/font/google"

const fira_sans = Fira_Sans({
	weight: "800",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-fira",
})

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<Head>
				<meta name="viewport" content="width=device-width" />
			</Head>
			<body className={`${fira_sans.variable}`}>
				{/* <Header /> */}
				{children}
				<Footer />
			</body>
		</html>
	)
}
