"use server"
import { revalidatePath } from "next/cache"
import { PrismaClient } from "@prisma/client"
import { s3Client } from "nodejs-s3-typescript"
import { getDate, getMonth, getYear } from "date-fns"
import slugify from "react-slugify"

const friendlyDateMaker = (currentDate: any) => {
	let mon = ""
	let ordinal = ""

	//month 0 - 11
	const currentMonthNumber = getMonth(currentDate)

	//set month abbreviation
	if (currentMonthNumber == 0) {
		mon = "Jan"
	} else if (currentMonthNumber == 1) {
		mon = "Feb"
	} else if (currentMonthNumber == 2) {
		mon = "Mar"
	} else if (currentMonthNumber == 3) {
		mon = "Apr"
	} else if (currentMonthNumber == 4) {
		mon = "May"
	} else if (currentMonthNumber == 5) {
		mon = "Jun"
	} else if (currentMonthNumber == 6) {
		mon = "Jul"
	} else if (currentMonthNumber == 7) {
		mon = "Aug"
	} else if (currentMonthNumber == 8) {
		mon = "Sep"
	} else if (currentMonthNumber == 9) {
		mon = "Oct"
	} else if (currentMonthNumber == 10) {
		mon = "Nov"
	} else if (currentMonthNumber == 11) {
		mon = "Dec"
	}

	//day of the month 1-31
	const dayOfMonth = getDate(currentDate)

	//set ordinal
	if (dayOfMonth > 3 && dayOfMonth < 21) {
		ordinal = "th"
	}
	switch (dayOfMonth % 10) {
		case 1:
			ordinal = "st"
		case 2:
			ordinal = "nd"
		case 3:
			ordinal = "rd"
		default:
			ordinal = "th"
	}

	const theYear = getYear(currentDate)

	return `${mon} ${dayOfMonth}${ordinal}, ${theYear}`
}

//S3 Config
const s3Config = {
	bucketName: process.env.AWS_BUCKET_NAME as string,
	region: process.env.AWS_REGION as string,
	accessKeyId: process.env.AWS_ACCESS_ID as string,
	secretAccessKey: process.env.AWS_SECRET_ID as string,
}

export const addStory = async (theUrl: any, formData: FormData) => {
	const prisma = new PrismaClient()

	const title = formData.get("title")
	const meta_title = formData.get("meta_title")
	const keywords = formData.get("keywords")
	const body = formData.get("body")
	//url
	const date = friendlyDateMaker(new Date().toISOString())
	const topic = formData.get("topic")
	const slugifyMe = formData.get("slugifyMe")
	const slug = slugify(slugifyMe as string)
	//author_nick
	//author_avatar
	//created_at
	//updated_at
	const caption = formData.get("caption")
	const urls = [`https://weedblogimages.s3.amazonaws.com/${theUrl}`]
	const alt = formData.get("alt")
	const meta_description = formData.get("meta_description")

	//   id            BigInt   @id @default(autoincrement())
	//   title         String?  @db.VarChar
	//   keywords      String?  @db.VarChar
	//   body          String?
	//   url           String?  @db.VarChar
	//   date          String?  @db.VarChar
	//   topic         String?  @db.VarChar
	//   slug          String?  @db.VarChar
	//   author_nick   String?  @db.VarChar
	//   author_avatar String?  @db.VarChar
	//   created_at    DateTime @db.Timestamp(6)
	//   updated_at    DateTime @db.Timestamp(6)
	//   caption       String?
	//   urls          String[] @default([])
	//   alt           String?  @default("") @db.VarChar
	//   description   String?  @default("") @db.VarChar

	//const newFriendltDate = friendlyDateMaker(new Date().toISOString())

	await prisma.stories.create({
		data: {
			title: title as string,
			meta_title: meta_title as string,
			keywords: keywords as string,
			body: body as string,
			date: date as string,
			topic: topic as string,
			slug: slug as string,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			caption: caption as string,
			urls: urls as [],
			alt: alt as string,
			meta_description: meta_description as string,
		},
	})

	revalidatePath("/ziploker")
}

export const seeRecords = async () => {
	const prisma = new PrismaClient()

	const allUsers = await prisma.stories.findMany()

	return allUsers
}

export const UploadImage = async (formData: FormData) => {
	//console.log("FORMDATA", formData)

	try {
		const file = formData.get("file") as File
		//const folderName = formData.get("folderName") as string
		const s3 = new s3Client({
			...s3Config,
			//dirName: folderName,
		})
		const res = await s3.uploadFile(Buffer.from(await file.arrayBuffer()))
		return res
	} catch (e) {
		return "Image Upload failed broo" + e
	}
}
