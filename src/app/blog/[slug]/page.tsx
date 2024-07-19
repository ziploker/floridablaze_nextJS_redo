"use server"
import { PrismaClient } from "@prisma/client"

export default async function Story(params: any) {
	const prisma = new PrismaClient()

	let theSlug = params.params.slug as string
	console.log("in story==============================================", theSlug)
	const story = await prisma.stories.findUnique({
		where: {
			slug: theSlug.toString(),
		},
	})

	if (story) {
		console.log("found a story", story)
	} else {
		console.log("diddent find a story", story)
	}

	return <h1>Story</h1>
}
