"use server"
import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"

export default async function Story(params: any) {
	const prisma = new PrismaClient()

	let theSlug = params.params.slug as string
	console.log("in story==============================================", theSlug)
	const story = await prisma.stories.findUnique({
		where: {
			slug: theSlug.toString(),
		},
	})

	if (!story) {
		return notFound()
	}

	return <h1>Story</h1>
}
