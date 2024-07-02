"use server"
// @ts-nocheck

import { PrismaClient } from "@prisma/client"
import FormAddStory from "../../components/formAddStory"

//import $ from "jquery"

// const StoryPicWrapper = styled.div`
//   position: relative;
//   justify-self: center;
// `;

// const StoryPic = styled.img`
//   //border-radius: 50px;
//   border: 1px gray solid;
//   position: relative;
//   width: 70px;
//   height: 70px;
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
// `;

// const LabelForFile = styled.label`
//   text-align: center;
//   display: inline-block;
//   // font-size: 12px;
//   position: absolute;
//   right: -15px;
//   bottom: -13px;
//   z-index: 5;
//   border-radius: 50px;
//   //background-color: orange;
//   padding: 5px;
//   margin: 0 auto;

//   //background-color: orange;
//   cursor: pointer;

//   &:hover {
//     //background-color: #fce1b3;
//   }
// `;

// const Section = styled.section`
//   //background: rgb(136,189,188);
//   //background: radial-gradient(circle, rgba(136,189,188,1) 0%, rgba(158,190,189,0.9612044646960347) 41%);
//   //background: #F7C562;
//   //height: 100vh;
//   //min-height: 400px;
//   position: relative;
// `;

// const Form = styled.form`
//   display: grid;
//   //grid-template-columns: 90%;
//   grid-gap: 1.5rem;
//   width: 100vw;
// `;

// const FormWrapper = styled.div`
//   display: grid;
//   justify-content: center;
//   padding: 20px;
// `;

// const Input = styled.input`
//   width: 100%;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   height: 78vh;
//   overflow: hidden;
// `;

// const OptionWrapper = styled.div``;

//const formData = new FormData()

export default async function Ziploker() {
	const prisma = new PrismaClient()

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
			<FormAddStory addStory={addStory} />
		</div>
	)
}
