"use server"
import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import Image from "next/image"
import "../../../css/story.css"
import dummy_avatar from "../../../images/dummy_avatar.png"
import Header from "../../../components/header"

import { Metadata, ResolvingMetadata } from "next"

// type Props = {
//   params: { id: string }
//   searchParams: { [key: string]: string | string[] | undefined }
// }

export async function generateMetadata(params: any): Promise<Metadata> {
	const prisma = new PrismaClient()
	console.log("::PARAMS:::::::::::::::::::::", params)

	let theSlug = params.params.slug as string
	console.log("in story==============================================", theSlug)
	const artData = await prisma.stories.findUnique({
		where: {
			slug: theSlug,
		},
	})

	if (!artData) {
		return {
			title: "",
		}
	}

	return {
		title: artData.meta_title as string,
		description: artData.meta_description as string,
		metadataBase: new URL("https://floridablaze.io"),
		alternates: {
			canonical: `blog/${artData.slug}`,
			// languages: {
			// 	"en-US": "/en-US",
			// },
		},
		// <meta name="robots" content="index,follow,max-image-preview:large">
		openGraph: {
			title: artData.meta_title as string,
			description: artData.meta_description as string,
			url: `https://floridaBlaze.io/blog/${artData.slug}`,
			siteName: "FloridaBlaze",
			images: [
				{
					url: artData.urls[0], // Must be an absolute URL
					width: 800,
					height: 600,
				},
			],
			locale: "en_US",
			type: "article",
		},
	}
}

export default async function Story(params: any) {
	const prisma = new PrismaClient()

	let theSlug = params.params.slug as string
	console.log("in story==============================================", theSlug)
	const artData = await prisma.stories.findUnique({
		where: {
			slug: theSlug,
		},
	})

	if (!artData) {
		return notFound()
	}

	return (
		<>
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

				<div
					style={{ gridArea: "1/2/7/3" }}
					className="hidden bp900:border-[10px] bp900:border-solid bp900:border-pink bg-[pink] w-full h-full"
				/>
			</div>
		</>
	)
}

/////////////////////////////////////////////////////////////

//import React, { useEffect, useState, useRef, usePrevious } from "react";
//import styled from "styled-components";
//import { useLocation, useMatch, useParams } from "react-router-dom";

//import Comments from "./comments.jsx";

// import {
//   FacebookShareButton,
//   FacebookIcon,
//   TwitterShareButton,
//   TwitterIcon,
//   WhatsappShareButton,
//   WhatsappIcon,
// } from "react-share";
// import { Helmet } from "react-helmet";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// const ArticleSection = styled.div`

//   display: grid;
//   grid-template-columns: minmax(555px, 730px) 300px;
//   justify-content: center;
//   margin: 20px 14px 0px 14px;
//   grid-column-gap: 28px;

//   @media only screen and (max-width: 900px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const StoryTitleWrapper = styled.div`
//   grid-area: 1/1/2/2;
//   padding-bottom: 15px;
//   justify-self: start;
// `;

// const StoryTitle = styled.h1`
//   color: #303030;

//   font-weight: 700;
//   line-height: 1.1em;
//   letter-spacing: -2px;

//   color: #111111;

// `;

// const InfoBar = styled.div`
//   display: grid;
//   overflow: hidden;
//   grid-area: 4/1/5/2;
//   grid-template-columns: minmax(0px, min-content) 1fr minmax(0px, min-content);
//   grid-auto-rows: 1fr minmax(0px, min-content);
//   grid-template-areas:
//     "flexbox    flexbox    social "
//     "flexbox    flexbox    social ";

//   margin-top: 25px;
//   align-content: center;

//   @media only screen and (max-width: 420px) {
//     grid-template-columns: minmax(100px, min-content);
//     grid-auto-rows: 1fr 1fr;
//     margin-top: 0px;
//     grid-template-areas:
//       "social social "
//       "flexbox flexbox ";
//   }
// `;

// const FlexBar = styled.div`
//   display: flex;
//   grid-area: flexbox;
//   align-items: center;

//   @media only screen and (max-width: 420px) {
//     justify-content: start;
//     margin-top: 8px;
//   }
// `;

// const StoryImageWrapper = styled.div`
//   width: 100%;
//   height: 0px;

//   padding-top: 60%;
//   position: relative;

//   grid-area: 2/1/3/2;
// `;

// const StoryImage = styled.img`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// `;

// const Caption = styled.div`
//   line-height: 1.7;
//   font-style: italic;
//   color: #999999;
//   padding: 5px 0 0 0;
//   border-bottom: 1px solid #c0c0c0;
//   grid-area: 3/1/4/2;
// `;

// const StoryShareButtons = styled.div`
//   display: flex;
//   justify-content: end;
//   grid-area: social;
//   align-self: center;

// `;

// const PWrapper = styled.div`
//   line-height: 1.9em;
//   grid-area: 5/1/6/2;
//   margin-top: 50px;

//   h1 {
//     margin: 20px 0;
//   }

//   h2 {
//     margin-bottom: 25px;
//   }

//   p {
//     margin: 20px 0 40px 0;
//   }
// `;

// const AuthorAvartar = styled.img`
//   width: 40px;
//   height: 40px;
//   align-self: end;
//   grid-area: image;
//   border: 1px solid gray;
//   border-radius: 50%;
//   margin-right: 8px;
// `;

// const SideAds = styled.div`
//   border: 10px solid white;
//   background-color: pink;
//   opacity: 0.45;

//   grid-area: 1/2/7/3;

//   width: 100%;
//   height: 100%;

//   @media only screen and (max-width: 900px) {
//     display: none;
//   }
// `;

// function Article({ artData, userState }) {
//   //
//   const location = useLocation();
//   console.log(
//     "0000000000000000000000000000000000000000000 useLocation",
//     location
//   );

//   console.log("==============Article===============start", artData);
//   console.log("==============Article=============== location", location);

//   if (artData && artData != null) {
//     console.log("==============Article=============== artdata was full");
//     console.log("==============Article=============== location", location);

//     artData = artData;
//     console.log(
//       "artData set via props.artData - direct link to article - sparks#index"
//     );
//   } else {
//     // artData was null {
//     console.log("==============Article=============== artdata = null", artData);

//     if (location && location.state != null) {
//       console.log(
//         "==============Article=============== location.state",
//         location.state
//       );
//       const { art, pathname } = location.state;
//       artData = art;
//       console.log("artData set via props.location.art - link via home page");
//     }
//     console.log("artData not set, bad params");
//   }

//   const articleStructuredData = {
//     "@context": "https://schema.org",
//     "@type": "NewsArticle",
//     mainEntityOfPage: {
//       "@type": "WebPage",
//       "@id": `${artData.slug}`,
//     },
//     description: `${artData.description}`,
//     image: [`${artData.urls[0]}`],
//     inLanguage: "en-US",

//     dateCreated: `${artData.created_at}`,
//     dateModified: `${artData.updated_at}`,
//     author: {
//       "@type": "Person",
//       name: "FloridaBlaze Staff",
//     },
//     publisher: {
//       "@type": "NewsMediaOrganization",
//       name: "FloridaBlaze",
//       logo: {
//         "@type": "ImageObject",
//         url: "https://weedblogimages.s3.amazonaws.com/company_logo.png",
//         height: 35,
//         width: 285,
//       },
//     },
//   };

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(articleStructuredData),
//         }}
//       />
//       {Object.keys(userState.user).length > 0 &&
//       userState.user.isAdmin == true ? (
//         <Link
//           key={"b"}
//           to={"/story_editor/" + artData.id}
//           state={{ art: artData }}
//         >
//           edit STORY
//         </Link>
//       ) : null}

//       <Helmet>
//         <title>{artData.title}</title>

//         <link
//           rel="canonical"
//           href={`https://floridablaze.io/blog/${artData.slug}`}
//         ></link>

//         <meta property="og:title" content={artData.title} />
//         <meta property="og:description" content={artData.description} />
//         <meta property="og:image" content={artData.urls[0]} />
//         <meta
//           property="og:url"
//           content={`https://floridaBlaze.io/blog/${artData.slug}`}
//         />
//         <meta property="og:site_name" content="FloridaBlaze" />
//         <meta property="og:type" content="article" />
//       </Helmet>
//     </>
//   );
// }

// export default Article;
