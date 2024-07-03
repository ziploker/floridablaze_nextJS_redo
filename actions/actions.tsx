"use server"
import { revalidatePath } from "next/cache"
import { PrismaClient } from "@prisma/client"

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
