"use server"

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

	return (
		<div className="mt-[50px]">
			<FormAddStory />
		</div>
	)
}
