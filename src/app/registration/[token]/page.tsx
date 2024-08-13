"use server";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import "../../../css/story.css";
import dummy_avatar from "../../../images/dummy_avatar.png";
import Header from "../../../components/header";
import Comments from "../../../components/comments";

import { Metadata, ResolvingMetadata } from "next";

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
  const prisma = new PrismaClient();

  let incomingTokenFromEmail = params.params.token as string;
  console.log(
    "in NewUserSetup==============================================",
    incomingTokenFromEmail
  );
  // const userAccount = await prisma.users.findUnique({
  // 	where: {
  // 		confirm_token: incomingTokenFromEmail,
  // 	},
  // })

  //clear confirm_token (string)
  //set email_confirmed (string)

  try {
    const updatedUser = await prisma.users.update({
      where: {
        confirm_token: incomingTokenFromEmail,
      },
      data: {
        confirm_token: "",
        email_confirmed: "true",
      },
    });
    // res.status(200).json({
    // 	message: 'Task created',
    // 	success: true
    // })
    console.log("AFTER UPDATE USER", updatedUser);
  } catch (error) {
    console.log("Error occured in newUserSetup registration [token]");
    console.error("Request error", error);
    //res.status(500).json({ error: "Error creating tasks", success:false });
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
      <h1></h1>
    </>
  );
}
