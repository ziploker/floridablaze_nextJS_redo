"use client"
import Image from "next/image"
import Header from "@/components/header"
import React, { useEffect, useState, useRef } from "react"
import Home from "../components/home"

export default function Page() {
	const [openSideMenu, setOpenSideMenu] = useState("false")

	return (
		<div>
			<Header openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} />
			<Home />
			<h1 className="h-[70vh]">act</h1>
			<h1 className="h-[70vh]">join</h1>
		</div>
	)
}
