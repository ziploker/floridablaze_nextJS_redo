import "server-only"
import Image from "next/image"
//import React, { useEffect, useState, useRef } from "react";
import Home from "../components/home"
import Msc from "@/components/myServerComp"

export default function Page() {
	//const [openSideMenu, setOpenSideMenu] = useState("false");

	return (
		<div>
			{/* <Header openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} /> */}

			<Home>
				{/*@ts-expect-error Async Server Component*/}
				<Msc data="123" />
			</Home>
			<h1 className="h-[70vh]">act</h1>
			<h1 className="h-[70vh]">join</h1>
		</div>
	)
}
