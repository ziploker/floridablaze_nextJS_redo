"use server"
import { revalidatePath } from "next/cache"
import { PrismaClient } from "@prisma/client"
import { s3Client } from "nodejs-s3-typescript"
const vari = process?.env.AWS_BUCKET_NAME

console.log("actionnnnnnnn", vari)

//S3 Config
const s3Config = {
	bucketName: process.env.AWS_BUCKET_NAME as string,
	region: process.env.AWS_REGION as string,
	accessKeyId: process.env.AWS_ACCESS_ID as string,
	secretAccessKey: process.env.AWS_SECRET_ID as string,
}

export const addStory = async (formData: FormData) => {
	const prisma = new PrismaClient()
	const title = formData.get("title")

	await prisma.stories.create({
		data: {
			title: title as string,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
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
	console.log("FORMDATA", formData)
	console.log("FORMDATA2", process.env.AWS_BUCKET_NAME)
	try {
		const file = formData.get("file") as File
		const folderName = formData.get("folderName") as string
		const s3 = new s3Client({
			...s3Config,
			dirName: "folderName",
		})
		const res = await s3.uploadFile(Buffer.from(await file.arrayBuffer()))
		return res
	} catch (e) {
		return "Image Upload failed broo" + e
	}
}
