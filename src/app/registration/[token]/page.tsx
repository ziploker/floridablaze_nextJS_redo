"use server"
import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import Image from "next/image"
import "../../../css/story.css"
import dummy_avatar from "../../../images/dummy_avatar.png"
import Header from "../../../components/header"
import Comments from "../../../components/comments"

import { Metadata, ResolvingMetadata } from "next"

// type Props = {
//   params: { id: string }
//   searchParams: { [key: string]: string | string[] | undefined }
// }

// export async function generateMetadata(params: any): Promise<Metadata> {
// 	const prisma = new PrismaClient()
// 	console.log("::PARAMS:::::::::::::::::::::", params)

// 	let theSlug = params.params.slug as string
// 	console.log("in story==============================================", theSlug)
// 	const artData = await prisma.stories.findUnique({
// 		where: {
// 			slug: theSlug,
// 		},
// 	})

// 	if (!artData) {
// 		return {
// 			title: "",
// 		}
// 	}

// 	return {
// 		title: artData.meta_title as string,
// 		description: artData.meta_description as string,
// 		metadataBase: new URL("https://floridablaze.io"),
// 		alternates: {
// 			canonical: `blog/${artData.slug}`,
// 			// languages: {
// 			// 	"en-US": "/en-US",
// 			// },
// 		},
// 		// <meta name="robots" content="index,follow,max-image-preview:large">
// 		openGraph: {
// 			title: artData.meta_title as string,
// 			description: artData.meta_description as string,
// 			url: `https://floridaBlaze.io/blog/${artData.slug}`,
// 			siteName: "FloridaBlaze",
// 			images: [
// 				{
// 					url: artData.urls[0], // Must be an absolute URL
// 					width: 800,
// 					height: 600,
// 				},
// 			],
// 			locale: "en_US",
// 			type: "article",
// 		},
// 	}
// }

export default async function NewUserSetup(params: any) {
	const prisma = new PrismaClient()

	let incomingTokenFromEmail = params.params.token as string
	console.log(
		"in NewUserSetup==============================================",
		incomingTokenFromEmail
	)
	const userAccount = await prisma.users.findUnique({
		where: {
			confirm_token: incomingTokenFromEmail,
		},
	})

	if (!userAccount) {
		return notFound()
	}

	// const articleStructuredDataAsJson = {
	// 	"@context": "https://schema.org",
	// 	"@type": "NewsArticle",
	// 	mainEntityOfPage: {
	// 		"@type": "WebPage",
	// 		"@id": artData.slug,
	// 	},
	// 	description: artData.meta_description,
	// 	image: [artData.urls[0]],
	// 	inLanguage: "en-US",

	// 	dateCreated: artData.created_at,
	// 	dateModified: artData.updated_at,
	// 	author: {
	// 		"@type": "Person",
	// 		name: "FloridaBlaze Staff",
	// 	},
	// 	publisher: {
	// 		"@type": "NewsMediaOrganization",
	// 		name: "FloridaBlaze",
	// 		logo: {
	// 			"@type": "ImageObject",
	// 			url: "https://weedblogimages.s3.amazonaws.com/company_logo.png",
	// 			height: 35,
	// 			width: 285,
	// 		},
	// 	},
	// }

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(articleStructuredDataAsJson),
				}}
			/>
			<Header />
			<div className="grid grid-cols-[1fr] bp900:grid-cols-[minmax(555px,730px)300px] bp900:justify-center bp900:mx-[14px] bp900:mt-[20px] bp900:mb-0 bp900:gap-x-[28px]">
				<div className="pb-[15px] justify-self-start" style={{ gridArea: "1/1/2/2" }}>
					<h1 className="text-[#111111] font-bold leading-[1.1em] -tracking-[2px] text-[2rem]">
						{artData.title}
					</h1>
				</div>

				<div
					style={{ gridArea: "3/1/4/2" }}
					className="leading-[1.7] italic text-[#999999] px-0 pl-0 pr-[5px] vorder-b-[1px] border-solid border-[#c0c0c0]"
					dangerouslySetInnerHTML={{ __html: artData.caption as string }}
				></div>

				<div
					style={{ gridArea: "4/1/5/2" }}
					className="grid 
                      grid-cols-[minmax(100px,min-content)] 
                      auto-rows-[1fr 1fr]
                      mt-0
                      grid-areas-story1
                      bp420:overflow-hidden
                      bp420:grid-cols-[minmax(0px,min-content)_1fr_minmax(0px,min-content)]
                      bp420:auto-rows-[1fr_minmax(0px, min-content)]
                      bp420:grid-areas-story2
                      bp420:mt-[25px]
                      bp420:content-center"
				>
					<div className="flex grid-in-flexbox items-center bp420:justify-start bp420:mt-[8px]">
						<Image
							// src={artData.author_avatar as string}
							src={dummy_avatar}
							alt=""
							className="w-[40px] h-[40px] grid-in-image 
			border-solid border-[1px] border-[gray] rounded-[50%]
			mr-[8px]"
							width={40}
							height={40}
						/>

						<h4 style={{ fontSize: ".7rem", lineHeight: "normal" }}>by FloridaBlaze</h4>
						<div style={{ margin: "0px 5px" }}>|</div>
						<h4
							style={{
								fontFamily: "serif",
								color: "#777777",
								fontSize: ".7rem",
								lineHeight: "normal",
								marginRight: "8px",
							}}
						>
							{artData.date}
						</h4>
					</div>

					<div className="flex justify-end grid-in-social self-center">
						<h3>social buttons here</h3>
					</div>
				</div>

				<div className="w-full h-0 pt-[60%] relative" style={{ gridArea: "2/1/3/2" }}>
					<Image
						src={artData.urls[0]}
						alt={artData.alt as string}
						className="absolute top-0 left-0 w-full h-full"
						width={600}
						height={500}
					/>
				</div>

				<div className="article" dangerouslySetInnerHTML={{ __html: artData.body as string }}></div>

				{/* <Comments userState={userState} artData={artData} slug={artData.slug} /> */}
				<Comments artData={artData} />

				{/* <div
					style={{ gridArea: "6/1/7/2" }}
					className="hidden bp900:border-[10px] bp900:border-solid bp900:border-pink bg-[pink] w-full h-full"
				/> */}
			</div>
		</>
	)
}
