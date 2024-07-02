"use client"
//import { useState } from "react"
//import slugify from "react-slugify"
import { addStory } from "../../actions"

export default function FormAddStory(props: any) {
	// const [state, setState] = useState({
	// 	title: "",
	// 	slugifyMe: "",
	// 	slug: "",
	// 	alt: "",
	// 	description: "",
	// 	//nameIsFocused: false,
	// 	keywords: "",
	// 	topic: "",
	// 	//phoneIsFocused: false,

	// 	caption: "",
	// 	body: "",
	// 	images: [],
	// 	//emailIsFocused: false,
	// 	//company: '',
	// 	//companyIsFocused: false,
	// 	//zip: '',
	// 	//zipIsFocused: false,
	// 	//message: '',
	// 	//messageIsFocused: false,
	// 	//error: '',
	// 	//activeIndex: null
	// })

	// const handleChange = (event: any) => {
	// 	console.log("handle change from form")
	// 	console.log(event)

	// 	const v = event.target.value
	// 	//const { id } = props
	// 	//const value = event.target.value
	// 	console.log("nameeeeee = " + event.target.name)
	// 	console.log("valluuee = " + event.target.value)
	// 	console.log("focus = " + event.target.tagger)

	// 	if (event.target.name == "slugifyMe") {
	// 		setState({
	// 			...state,
	// 			slug: slugify(v),
	// 			[event.target.name]: v,
	// 			//error: "",
	// 		})
	// 	} else {
	// 		setState({
	// 			...state,
	// 			[event.target.name]: v,
	// 			//error: "",
	// 		})
	// 		//return onChange(id, value);
	// 	}
	// }

	// const getClass = () => {
	// 	if (state.focus === true) return "field focussed"
	// 	else return "field"
	// }

	// const handleImageChange = (event) => {
	// 	console.log("handleImageChange_EVENTTTTTTTTTTTTTTTTTTTTTTTT", event.target.files)

	// 	let imageArray = []

	// 	Object.keys(event.target.files).map((item) => {
	// 		console.log("insideHHHH KEY", event.target.files[item])
	// 		imageArray.push(event.target.files[item])
	// 	})

	// 	// event.target.files.map((file) => {
	// 	// 	console.log("insideMAP", file);
	// 	// 	imageArray.push(file);
	// 	// });

	// 	//imageArray.push(event.target.files[0]);

	// 	//console.log("full imageArray[0]  is ", imageArray[0]);

	// 	//formData.append("event[images]", event.target.files[0]);
	// 	//formData.append("event[images]", JSON.stringify(imageArray));

	// 	for (const a of imageArray) {
	// 		formData.append("images[]", a)
	// 	}

	// 	//console.log(...formData)

	// 	// setState({
	// 	// 	...state,
	// 	// 	images: URL.createObjectURL(event.target.files[0]),
	// 	// });

	// 	setState((prevState) => ({
	// 		...state,
	// 		images: [...prevState.images, URL.createObjectURL(event.target.files[0])],
	// 	}))
	// }
	return (
		<form action={addStory} className="form-inline grid gap-[20px] justify-center p-[20px]">
			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					//index={1}
					className="form-control w-full h-full"
					name="title"
					placeholder="title of the story...."
					// value={state.title}
					// onChange={handleChange}
					required
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					//index={2}
					className="form-control w-full h-full"
					name="slugifyMe"
					placeholder="slugify me"
					// value={state.slugifyMe}
					// onChange={handleChange}
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					//index={3}
					className="form-control w-full h-full"
					name="slug"
					placeholder="slug (automatic from slugify me)"
					//value={slugify(state.slugifyMe)}
					// //onChange={handleChange}
					readOnly
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					//index={4}
					className="form-control w-full h-full"
					name="alt"
					placeholder="alt text for image"
					// value={state.alt}
					// onChange={handleChange}
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					//index={5}
					className="form-control w-full h-full"
					name="keywords"
					//focus="phoneIsFocused"
					placeholder="tags keywords etc..."
					// value={state.keywords}
					// onChange={handleChange}
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					//index={6}
					className="form-control w-full h-full"
					name="topic"
					//focus="phoneIsFocused"
					placeholder="Local or National etc.."
					// value={state.topic}
					// onChange={handleChange}
				/>
			</div>

			<div className="relative self-center">
				<label
					className="text-center inline-block absolute -right-[15px] -bottom-[13px] rounded-[50px] p-[5px] my-0 mx-auto"
					htmlFor="images"
				>
					&#128393;
				</label>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					//index={7}
					className="form-control w-full h-full"
					name="caption"
					//focus="phoneIsFocused"
					placeholder="photo caption HTML"
					// value={state.caption}
					// onChange={handleChange}
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					//index={8}
					className="form-control w-full h-full"
					name="description"
					//focus="phoneIsFocused"
					placeholder="Description seo meta tags (JSON-LD)"
					// value={state.description}
					// onChange={handleChange}
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
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
					//index={9}
					accept="image/*"
					className="form-control"
					name="images"
					multiple
					//focus="phoneIsFocused"
					//placeholder="tags keywords etc..."

					//onChange={handleImageChange}
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<textarea
					//type="text"
					//index={10}
					className="form-control h-screen w-full"
					name="body"
					placeholder="Story HTML..."
					//value={state.body}
					//readOnly
					//onChange={handleChange}
				/>
			</div>

			<button type="submit" className="btn btn-primary">
				Add
			</button>
		</form>
	)
}
