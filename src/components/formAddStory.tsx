"use client"

import { addStory } from "../../actions/actions"

export default function FormAddStory() {
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
		<form
			action={async (formData) => {
				await addStory(formData)
			}}
			className="form-inline grid gap-[20px] justify-center p-[20px]"
		>
			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					className="form-control w-full h-full"
					name="title"
					placeholder="title of the story...."
					required
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					className="form-control w-full h-full"
					name="slugifyMe"
					placeholder="slugify me"
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					className="form-control w-full h-full"
					name="slug"
					placeholder="slug (automatic from slugify me)"
					readOnly
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					className="form-control w-full h-full"
					name="alt"
					placeholder="alt text for image"
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					className="form-control w-full h-full"
					name="keywords"
					placeholder="tags keywords etc..."
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					className="form-control w-full h-full"
					name="topic"
					placeholder="Local or National etc.."
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
					className="form-control w-full h-full"
					name="caption"
					placeholder="photo caption HTML"
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<input
					type="text"
					className="form-control w-full h-full"
					name="description"
					placeholder="Description seo meta tags (JSON-LD)"
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
					accept="image/*"
					className="form-control"
					name="images"
					multiple
				/>
			</div>

			<div className="field w-screen h-full border border-black border-1">
				<textarea
					className="form-control h-screen w-full"
					name="body"
					placeholder="Story HTML..."
				/>
			</div>

			<button type="submit" className="btn btn-primary">
				Add
			</button>
		</form>
	)
}
