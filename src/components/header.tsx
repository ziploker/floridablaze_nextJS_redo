"use client"
import Image from "next/image"
import React, { useEffect, useState, useRef } from "react"

import leaf from "@/images/headerLeafv2.png"
import CompanyLogo from "@/components/companyLogo"
import LongNav from "@/components/longNav"

export default function Header() {
	const [logoScrolled, setLogoScrolled] = React.useState("false")
	const [longNavScrolled, setLongNavScrolled] = React.useState("false")

	const userState = { loggedInStatus: "NOT_LOGGED_IN" }

	return (
		<div className="relative grid grid-cols-[minmax(180px,280px)1fr] grid-areas-[left_right] grid-rows-[69px] gap-[8px] mt-[15px] max-w-[2000px] overflow-hidden cl_bp_520:grid-rows-[80px]">
			<div
				className={`fixed ${
					logoScrolled === "true" ? "opacity-100" : "opacity-0"
				} top-0 ease-linear duration-[.3s] z-20 w-full max-w[2000px] min-w=[269px] h-[50px] bg-[#f4f4f4]`}
			/>
			<CompanyLogo logoScrolled={logoScrolled} setLogoScrolled={setLogoScrolled} />
			<Image
				className="hidden grid-in-[right] z-30 leaf_bp_520px:block w-full h-full max-w-[520px] min-w-[250px] justify-self-end self-center"
				src={leaf}
				alt=""
			/>
			<LongNav
				longNavScrolled={longNavScrolled}
				setLongNavScrolled={setLongNavScrolled}
				userState={userState}
			/>
		</div>
	)
}
