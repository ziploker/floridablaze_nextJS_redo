import "server-only"
//import Image from "next/image"
//import React, { useEffect, useState, useRef } from "react";
import HomeClientWrapper from "../components/homeClientWrapper"
import Home from "@/components/home"
import Header from "@/components/header"

//import "../css/global";

export default function Page() {
	//const [openSideMenu, setOpenSideMenu] = useState("false");

	return (
		<>
			<Header />

			<HomeClientWrapper>
				{/* @ts-expect-error Server Component */}
				<Home data="123" />
			</HomeClientWrapper>
		</>
	)
}
