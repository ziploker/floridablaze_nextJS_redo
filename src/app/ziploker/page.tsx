"use server"
import { writeFile } from "fs/promises"
import { join } from "path"
import ImageUploaderS3 from "../../components/imageUploaderS3"

import FormAddStory from "../../components/formAddStory"

export default async function Ziploker() {
	// const handleAdd = (e) => {
	// 	e.preventDefault()

	// 	if (validForm()) {
	// 		formData.append("event[title]", state.title)
	// 		formData.append("event[slug]", state.slug)
	// 		formData.append("event[keywords]", state.keywords)
	// 		formData.append("event[description]", state.description)
	// 		formData.append("event[topic]", state.topic)
	// 		formData.append("event[alt]", state.alt)
	// 		formData.append("event[body]", state.body)
	// 		formData.append("event[caption]", state.caption)
	// 		console.log("formdata from handle add in form")
	// 		console.log(formData)

	// 		//get token for form submission
	// 		// const csrf = <Element>document
	// 		//   .querySelector("meta[name='csrf-token']")
	// 		//   .getAttribute("content");
	// 		$.ajax({
	// 			url: "/stories",
	// 			// headers: {
	// 			//   "X-CSRF-Token": csrf,
	// 			// },
	// 			method: "POST",
	// 			data: formData,
	// 			contentType: false,
	// 			processData: false,

	// 			success: function (data) {
	// 				//props.handleAdd(data);
	// 				setState({
	// 					//focussed: (props.focussed) || false,
	// 					title: "",
	// 					slug: "",
	// 					alt: "",
	// 					description: "",
	// 					keywords: "",
	// 					topic: "",
	// 					body: "",
	// 					caption: "",
	// 					images: null,
	// 				})
	// 				alert("Upload worked")
	// 			},
	// 			error: function (xhr, status, error) {
	// 				alert(error)
	// 			},
	// 		})
	// 	} else {
	// 		alert("Please fill all fields.")
	// 	}
	// }

	// const validForm = () => {
	// 	if (state.title && state.keywords && state.topic && state.body) {
	// 		return true
	// 	} else {
	// 		return true
	// 	}
	// }

	////const { focussed, value, error, label } = state
	////const { id, type, locked } = props
	//const fieldClassName = `field ${(locked ? focussed : focussed || value) && 'focussed'}`;
	//const fcn = state.nameIsFocused ? "xxxfocused" : "xxxNotfocused"

	async function upload(data: FormData) {
		"use server"

		const file: File | null = data.get("file") as unknown as File
		if (!file) {
			throw new Error("No file uploaded")
		}

		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)

		// With the file data in the buffer, you can do whatever you want with it.
		// For this, we'll just write it to the filesystem in a new location
		const path = join("/", "tmp", file.name)
		await writeFile(path, buffer)
		console.log(`open ${path} to see the uploaded file`)

		return { success: true }
	}

	return (
		<div className="mt-[50px]">
			<FormAddStory />
			<h1>React Server Component: Upload</h1>
			<form action={upload}>
				<input type="file" name="file" />
				<input type="submit" value="Upload" />
			</form>
			<h1>================================</h1>
			<ImageUploaderS3 />
		</div>
	)
}
