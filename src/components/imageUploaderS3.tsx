"use client"
import { useState } from "react"
import ImageUploading, { ImageListType } from "react-images-uploading"
import Image from "next/image"
import FormAddStory from "../components/formAddStory"

//Actions
import { UploadImage } from "../../actions/actions"

const ImageUploader = () => {
	//State
	const [image, setImage] = useState<ImageListType>([])
	const [awsResponse, setAwsResponse] = useState({})

	//OnImageChange
	const onImageChange = async (imageList: ImageListType) => {
		await setImage(imageList)
		if (imageList.length > 0 && (imageList[0].file as File)) {
			const formData = new FormData()
			formData.append("file", imageList[0].file as File)
			formData.append("folderName", "nextjs-server-action")
			//Here I am calling the server action function
			const data = await UploadImage(formData)
			console.log(data)
			setAwsResponse(data)
		}
	}
	return (
		<div>
			<ImageUploading value={image} onChange={onImageChange} multiple={false} maxFileSize={5000000}>
				{({ imageList, onImageUpload, isDragging, dragProps }) => (
					<div>
						{imageList.length === 0 && (
							<button
								onClick={onImageUpload}
								{...dragProps}
								className={`border-2 border-dashed w-full rounded-md text-center py-12 hover:border-main ${
									isDragging ? "border-main" : "border-gray-300"
								}`}
								type="button"
							>
								<div className={`${isDragging ? "pointer-events-none" : ""}`}>
									{/* <Image
										src="/upload.png"
										width={90}
										height={90}
										alt="Upload"
										className="w-[70px] mx-auto"
									/> */}
									<h6 className="text-base font-medium text-gray-600">
										Drop your image here, or <span className="text-main">browse</span>
									</h6>
								</div>
							</button>
						)}
						{/* {imageList.length > 0 &&
							imageList.map((image, i) => (
								<div key={i} className={`relative cursor-pointer group rounded-md overflow-hidden`}>
									<Image
										src={image["fvr-url"]}
										alt="Image"
										width={400}
										height={400}
										className="w-full object-cover object-top"
									/>
								</div>
							))} */}
					</div>
				)}
			</ImageUploading>
			<FormAddStory awsResponse={awsResponse} />
		</div>
	)
}

export default ImageUploader
