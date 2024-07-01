"use client"
import { useState } from "react"

import slugify from "react-slugify"
import $ from "jquery"

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

const formData = new FormData()

export default function Ziploker() {
	const [state, setState] = useState({
		title: "",
		slugifyMe: "",
		slug: "",
		alt: "",
		description: "",
		//nameIsFocused: false,
		keywords: "",
		topic: "",
		//phoneIsFocused: false,

		caption: "",
		body: "",
		images: [],
		//emailIsFocused: false,
		//company: '',
		//companyIsFocused: false,
		//zip: '',
		//zipIsFocused: false,
		//message: '',
		//messageIsFocused: false,
		//error: '',
		//activeIndex: null
	})

	const handleAdd = (e) => {
		e.preventDefault()

		if (validForm()) {
			formData.append("event[title]", state.title)
			formData.append("event[slug]", state.slug)
			formData.append("event[keywords]", state.keywords)
			formData.append("event[description]", state.description)
			formData.append("event[topic]", state.topic)
			formData.append("event[alt]", state.alt)
			formData.append("event[body]", state.body)
			formData.append("event[caption]", state.caption)
			console.log("formdata from handle add in form")
			console.log(formData)

			//get token for form submission
			// const csrf = <Element>document
			//   .querySelector("meta[name='csrf-token']")
			//   .getAttribute("content");
			$.ajax({
				url: "/stories",
				// headers: {
				//   "X-CSRF-Token": csrf,
				// },
				method: "POST",
				data: formData,
				contentType: false,
				processData: false,

				success: function (data) {
					//props.handleAdd(data);
					setState({
						//focussed: (props.focussed) || false,
						title: "",
						slug: "",
						alt: "",
						description: "",
						keywords: "",
						topic: "",
						body: "",
						caption: "",
						images: null,
					})
					alert("Upload worked")
				},
				error: function (xhr, status, error) {
					alert(error)
				},
			})
		} else {
			alert("Please fill all fields.")
		}
	}

	const validForm = () => {
		if (state.title && state.keywords && state.topic && state.body) {
			return true
		} else {
			return true
		}
	}

	const handleChange = (event) => {
		console.log("handle change from form")
		console.log(event)

		const v = event.target.value
		//const { id } = props
		//const value = event.target.value
		console.log("nameeeeee = " + event.target.name)
		console.log("valluuee = " + event.target.value)
		console.log("focus = " + event.target.tagger)

		if (event.target.name == "slugifyMe") {
			setState({
				...state,
				slug: slugify(v),
				[event.target.name]: v,
				//error: "",
			})
		} else {
			setState({
				...state,
				[event.target.name]: v,
				//error: "",
			})
			//return onChange(id, value);
		}
	}

	// const getClass = () => {
	// 	if (state.focus === true) return "field focussed"
	// 	else return "field"
	// }

	const handleImageChange = (event) => {
		console.log("handleImageChange_EVENTTTTTTTTTTTTTTTTTTTTTTTT", event.target.files)

		let imageArray = []

		Object.keys(event.target.files).map((item) => {
			console.log("insideHHHH KEY", event.target.files[item])
			imageArray.push(event.target.files[item])
		})

		// event.target.files.map((file) => {
		// 	console.log("insideMAP", file);
		// 	imageArray.push(file);
		// });

		//imageArray.push(event.target.files[0]);

		//console.log("full imageArray[0]  is ", imageArray[0]);

		//formData.append("event[images]", event.target.files[0]);
		//formData.append("event[images]", JSON.stringify(imageArray));

		for (const a of imageArray) {
			formData.append("images[]", a)
		}

		//console.log(...formData)

		// setState({
		// 	...state,
		// 	images: URL.createObjectURL(event.target.files[0]),
		// });

		setState((prevState) => ({
			...state,
			images: [...prevState.images, URL.createObjectURL(event.target.files[0])],
		}))
	}

	////const { focussed, value, error, label } = state
	////const { id, type, locked } = props
	//const fieldClassName = `field ${(locked ? focussed : focussed || value) && 'focussed'}`;
	//const fcn = state.nameIsFocused ? "xxxfocused" : "xxxNotfocused"

	return (
		<div>
			<form className="form-inline" onSubmit={handleAdd} enctype="multipart/form-data">
				<div className="field">
					<input
						type="text"
						index={1}
						className="form-control"
						name="title"
						placeholder="title of the story...."
						value={state.title}
						onChange={handleChange}
					/>
				</div>

				<div className="field">
					<input
						type="text"
						index={2}
						className="form-control"
						name="slugifyMe"
						placeholder="slugify me"
						value={state.slugifyMe}
						onChange={handleChange}
					/>
				</div>

				<div className="field">
					<input
						type="text"
						index={3}
						className="form-control"
						name="slug"
						placeholder="slug (automatic from slugify me)"
						value={slugify(state.slugifyMe)}
						//onChange={handleChange}
						readOnly
					/>
				</div>

				<div className="field">
					<input
						type="text"
						index={4}
						className="form-control"
						name="alt"
						placeholder="alt text for image"
						value={state.alt}
						onChange={handleChange}
					/>
				</div>

				<div className="field">
					<input
						type="text"
						index={5}
						className="form-control"
						name="keywords"
						//focus="phoneIsFocused"
						placeholder="tags keywords etc..."
						value={state.keywords}
						onChange={handleChange}
					/>
				</div>

				<div className="field">
					<input
						type="text"
						index={6}
						className="form-control"
						name="topic"
						//focus="phoneIsFocused"
						placeholder="Local or National etc.."
						value={state.topic}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label htmlFor="images">&#128393;</label>
				</div>

				<div className="field">
					<input
						type="text"
						index={7}
						className="form-control"
						name="caption"
						//focus="phoneIsFocused"
						placeholder="photo caption HTML"
						value={state.caption}
						onChange={handleChange}
					/>
				</div>

				<div className="field">
					<input
						type="text"
						index={8}
						className="form-control"
						name="description"
						//focus="phoneIsFocused"
						placeholder="Description seo meta tags (JSON-LD)"
						value={state.description}
						onChange={handleChange}
					/>
				</div>

				<div className="field">
					<input
						style={{
							width: "111px",
							height: "111px",
							opacity: "0",
							overflow: "hidden",
							position: "absolute",
							zIndex: "-1",
						}}
						id="images"
						type="file"
						index={9}
						accept="image/*"
						className="form-control"
						name="images"
						multiple
						//focus="phoneIsFocused"
						//placeholder="tags keywords etc..."

						onChange={handleImageChange}
					/>
				</div>

				<div className="field">
					<textarea
						type="text"
						index={10}
						className="form-control"
						name="body"
						placeholder="Story HTML..."
						value={state.body}
						//readOnly
						onChange={handleChange}
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Add
				</button>
			</form>
		</div>
	)
}
