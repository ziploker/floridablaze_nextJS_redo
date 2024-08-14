"use server"
import { revalidatePath } from "next/cache"
import { PrismaClient } from "@prisma/client"
import { s3Client } from "nodejs-s3-typescript"
import { getDate, getMonth, getYear } from "date-fns"
import slugify from "react-slugify"
import { z } from "zod"
import { v4 as uuidv4 } from "uuid"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

//import FormData from "form-data";
import Mailgun from "mailgun.js"
const mailgun = new Mailgun(FormData)
const mg = mailgun.client({
	username: "api",
	key: process.env.MAILGUN_API || "key-yourkeyhere",
})

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

//Authenticate User
export const AuthenticateUser = async (initialState: any, formData: FormData) => {
	console.log("AuthenticateUser FORM DATA", formData)

	const userEmail = formData.get("email")
	const password = formData.get("password")
	const remember = formData.get("remember")

	console.log("AuthenticateUser  ", userEmail + " // " + password + " // " + remember)

	const user = await prisma.users.findUnique({
		where: {
			email: userEmail as string,
		},
	})

	if (user) {
		console.log("Login User Found in DB", user)

		const passwordMatches = await bcrypt.compare(password as string, user.password_digest)

		if (passwordMatches) {
			console.log("passwords matched")
		} else {
			console.log("passwords diddent match")
		}
	} else {
		console.log("Login User NOTFound in DB")
	}
}

//create new user
export const createNewUser = async (initialState: any, formData: FormData) => {
	console.log("SERVER ACTION FORM DATA", formData)
	const fullName = formData.get("full_name")
	const email = formData.get("email")
	const password = formData.get("password")
	const remember = formData.get("remember")
	const roundsOfHashing = 10

	//get envoinment variabvle
	const env = process.env.NODE_ENV
	let myHostName = ""
	if (env == "development") {
		myHostName = "127.0.0.1:3000"
	} else if (env == "production") {
		myHostName = "https://floridablaze.io"
	}

	// setup ZOD to check data
	const UserSchema = z.object({
		fullName: z.string().min(5).max(20),
		email: z.string().email(),
		password: z.string().min(8).max(20),
	})

	type User = z.infer<typeof UserSchema>

	const zodUserInfo: User = {
		fullName: fullName as string,
		email: email as string,
		password: password as string,
	}

	// parsing form data and Return early if the form data is invalid
	console.log("EEEEEE", UserSchema.safeParse(zodUserInfo).error?.format())

	//if parsing data gave error, set error message for client and return early
	if (!UserSchema.safeParse(zodUserInfo).success) {
		let em = ""

		if (UserSchema.safeParse(zodUserInfo).error?.format().fullName) {
			em = "Full name is to short.\n"
		}

		if (UserSchema.safeParse(zodUserInfo).error?.format().email) {
			if (em != "") {
				em = em + "Email doesn't look right.\n"
			} else {
				em = "Email doesn't look right.\n"
			}
		}

		if (UserSchema.safeParse(zodUserInfo).error?.format().password) {
			if (em != "") {
				em = em + "Password is too short.\n"
			} else {
				em = "Password is too short.\n"
			}
		}

		// if (UserSchema.safeParse(zodUserInfo).error?.format().email) {
		//   em = "email is invalid";
		//   if (UserSchema.safeParse(zodUserInfo).error?.format().password) {
		//     em = "email is invalid & password is too short";
		//   }
		// } else {
		//   if (UserSchema.safeParse(zodUserInfo).error?.format().password) {
		//     em = "password is too short";
		//   }
		// }

		return {
			success: false,
			message: em,
		}
	}
	try {
		//throw new Error("test error to see if it catches");
		//set up new user account

		const token = uuidv4().toString().replace(/-/g, "")
		console.log("TokenCheck", token)

		console.log(
			"info",
			UserSchema.safeParse(zodUserInfo).data?.email +
				" & " +
				UserSchema.safeParse(zodUserInfo).data?.password
		)

		const hashedPassword = await bcrypt.hash(
			UserSchema.safeParse(zodUserInfo).data?.password as string,

			roundsOfHashing
		)

		let nickName = ""
		const firstNickNameInArray = fullName?.toString().split(" ")[0]

		if ((firstNickNameInArray?.length as number) > 1) {
			nickName = firstNickNameInArray as string
		} else {
			nickName = fullName as string
		}

		await prisma.users.create({
			data: {
				full_name: fullName as string,
				nick: nickName,
				email: email as string,
				password_digest: hashedPassword as string,
				confirm_token: token,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
		})

		mg.messages.create("mg.floridablaze.io", {
			from: "FloridaBlaze Staff <admin@mg.floridablaze.io>",
			to: [email as string],
			"h:List-Unsubscribe": "<mailto:admin@floridablaze.io?subject=unsubscribe>",
			"h:Reply-To": "FlordaBlaze Staff <admin@floridablaze.io>",
			subject: "Welcome to floridablaze.io",
			text: "Testing some Mailgun awesomness!",
			html: `<html>
          <body>
              <h1> Hi ${nickName},</h1>

              <p> Thank you for registering at Floridablaze<br>
              Please navigate to the link below to activate your account<br><br>

              ${myHostName}/registration/${token}<br></p>

              <p>Thank you,<br>

              <em>-Floridablaze Team</em></p><br><br><br>

              If You wish to unsubscribe click <a href=${myHostName}/unsubscribe/${email}>HERE</a>

          </body>
      </html>`,
		})
		console.log("after MGGGGGGGGGGGGG")
		return {
			success: true,
			message: "Got it! check email to activate account.",
		}
	} catch (error) {
		console.log("Some error occur", error)
		return { message: "failed to create user" }
	}

	// // //   console.log("ZEMAIL2", UserSchema.safeParse(z_email).error);
	//console.log("ZPASSWORD", UserSche ma.safeParse(z_password));
	//console.log("ZREMEMNER", UserSchema.safeParse(z_remember));
	// "safe" parsing (doesn't throw error if validation fails)
	//UserSchema.safeParse(user);
	// => { success: true; data: {username: "Arafat"} }

	//UserSchema.safeParse(12);
	// => { success: false; error: ZodError }

	// console.log(
	// 	"check-----------",
	// 	process.env.MAILGUN_API,
	// 	email,
	// 	password,
	// 	remember ? "remember me" : "forget it"
	// )
}

export const addStory = async (theUrl: any, formData: FormData) => {
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
