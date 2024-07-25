import type { Metadata, Viewport} from "next";
//import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Head from "next/head";
// import Header from "@/components/header";

//const inter = Inter({ subsets: ["latin"] });
import { Fira_Sans } from "next/font/google";

const fira_sans = Fira_Sans({
  weight: "800",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira",
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	//maximumScale: 1,
	userScalable: true,
	// Also supported by less commonly used
	// interactiveWidget: 'resizes-visual',
  }

export const metadata: Metadata = {
  title: "Florida Cannabis News | Lookup State Representatives",
  description: "Bringing you the latest Cannabis related news and information about recent changes in drug laws affecting Florida. We also make it easy to Lookup your State Representatives and contact them via USPS in just a few clicks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        
		{/* <script src="https://apis.google.com/js/platform.js" async defer></script> */}
        

		<title></title>

		<link rel="canonical" href="https://floridablaze.io/" data-react-helmet="true"/>

		<meta name="robots" content="index,follow"/>
		

		<meta name="description" content="">

		<meta property="og:title" content="Cannabis News for Florida | Lookup State Representativese" data-react-helmet="true">
		<meta property="og:description" content="Bringing you the latest Cannabis related news and information about recent changes in drug laws affecting Florida. We also make it easy to Lookup your State Representatives and contact them via USPS in just a few clicks." data-react-helmet="true">
		<meta property="og:image" content="https://weedblogimages.s3.amazonaws.com/company_logo.png" data-react-helmet="true">
		<meta property="og:url" content="https://floridaBlaze.io" data-react-helmet="true">
		<meta property="og:site_name" content="FloridaBlaze" data-react-helmet="true">
		<meta property="og:type" content="website" data-react-helmet="true"></meta>
      </Head>
      <body className={`${fira_sans.variable}`}>
        {/* <Header /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
