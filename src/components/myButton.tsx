"use client"
//import { PrismaClient } from "@prisma/client"
import { seeRecords } from "../../actions/actions"
export default function MyButton() {
	//const prisma = new PrismaClient()

	async function doSomething() {
		const allUsers = seeRecords()

		console.log("CLient Data", allUsers)
	}

	return <button onClick={doSomething}>See Records</button>
}
