"use client"
//import Image from "next/image"
import React, { useEffect, useState, useRef } from "react"
interface Props {
	openSideMenu: string
	setOpenSideMenu: (word: string) => void
	leafScrolledSoChangeColorDown: string
	leafScrolledSoChangeColorUp: string
	scrollDir: string
}
export default function Hamburger(props: Props) {
	const [hamburgerScrolled, setHamburgerScrolled] = React.useState("false")
	const [pixlesFromHamburgerToTop, setPixlesFromHamburgerToTop] = useState(0)
	const hamburgerRef = useRef<HTMLInputElement>(null)
	let listener: any

	useEffect(() => {
		console.log("inside useeffect =========================")
		// // // if (hamburgerRef.current) {
		// // // 	console.log(
		// // // 		"inside useeffect =========================",
		// // // 		hamburgerRef.current.getBoundingClientRect().top
		// // // 	)
		// // // 	// hamburgerRef.current.getBoundingClientRect().top > 37
		// // // 	// 	? null
		// // // 	// 	: setPixlesFromHamburgerToTop(hamburgerRef.current.getBoundingClientRect().top)
		// // // 	setPixlesFromHamburgerToTop(hamburgerRef.current.getBoundingClientRect().top)
		// // // }

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	useEffect(() => {
		console.log("UseEffect 5555555555555t////ester")
		// make it so this header doesnt load on certin pages

		//function to pass to mousedown listener, to close side menu if need be.
		listener = (event: any) => {
			if (hamburgerRef.current) {
				//if you click in the menu,  dont close it
				if (hamburgerRef.current.contains(event.target)) {
					return
				}
			}

			//if you click anywhere outside the side menu, close it.
			//mouseDownHandler();
			props.setOpenSideMenu("false")
		}

		//resize and/or orientationchange listener
		const handleResize = () => {
			//closed sideMenu on orientation change, if it gets bigger than 850px

			if (hamburgerRef.current) {
				console.log("UseEffect 5555555555555", hamburgerRef.current.getBoundingClientRect().top)
			}
			// if (
			// 	window.innerWidth < 600 &&
			// 	pixlesFromHamburgerToTop == 47 &&
			// 	hamburgerRef.current != null
			// ) {
			// 	console.log("ALL CONDITIONS MET, CHANGE it")
			// 	setPixlesFromHamburgerToTop(37)
			// }

			if (window.innerWidth > 500) {
				props.setOpenSideMenu("false")
			}
		}

		//set up event listeners
		window.addEventListener("resize", handleResize)
		window.addEventListener("orientationchange", handleResize)
		document.addEventListener("mousedown", listener)

		return () => {
			window.removeEventListener("resize", handleResize)
			window.removeEventListener("orientationchange", handleResize)
			document.removeEventListener("mousedown", listener)
			console.log("cleanup")
		}
	}, [])
	//}, [hamburgerRef, mouseDownHandler]);

	// sets the state so the element can stick
	const handleScroll = () => {
		if (hamburgerRef.current) {
			window.scrollY >= hamburgerRef.current.getBoundingClientRect().top + 28
				? setHamburgerScrolled("true")
				: setHamburgerScrolled("false")
		}
	}

	return (
		<div
			className={`${
				hamburgerScrolled === "true"
					? "mt-0 fixed pr-[0px] top-[17px] right-[22px] "
					: "mt-[17px] grid cl_bp_520:mt-[8px] pr-[22px] top-[initial]"
			}  z-40 self-start cl_bp_520:self-center grid-in-[right] justify-self-end `}
			ref={hamburgerRef}
		>
			<button
				className="longNav_bp_600:hidden grid justify-around h-[1.5rem] bg-transparent border-[none] p-0 cursor-pointer select-none"
				onClick={() => {
					props.setOpenSideMenu(props.openSideMenu == "true" ? "false" : "true")
				}}
			>
				<div
					className={`w-[50px] h-[3px] rounded-[10px] ease-linear duration-[.2s] relative origin-[14px_0] bg-black ${
						props.scrollDir === "scrolling down"
							? props.leafScrolledSoChangeColorDown === "true"
								? "cl_bp_520:bg-black"
								: "cl_bp_520:bg-white"
							: props.leafScrolledSoChangeColorUp === "true"
							? "cl_bp_520:bg-white"
							: "cl_bp_520:bg-black"
					}`}
				/>
				<div
					className={`w-[50px] h-[3px] rounded-[10px] ease-linear duration-[.2s] relative origin-[14px_0] bg-black ${
						props.scrollDir === "scrolling down"
							? props.leafScrolledSoChangeColorDown === "true"
								? "cl_bp_520:bg-black"
								: "cl_bp_520:bg-white"
							: props.leafScrolledSoChangeColorUp === "true"
							? "cl_bp_520:bg-white"
							: "cl_bp_520:bg-black"
					}`}
				/>
				<div
					className={`w-[50px] h-[3px] rounded-[10px] ease-linear duration-[.2s] relative origin-[14px_0] bg-black ${
						props.scrollDir === "scrolling down"
							? props.leafScrolledSoChangeColorDown === "true"
								? "cl_bp_520:bg-black"
								: "cl_bp_520:bg-white"
							: props.leafScrolledSoChangeColorUp === "true"
							? "cl_bp_520:bg-white"
							: "cl_bp_520:bg-black"
					}`}
				/>
			</button>
		</div>
	)
}

// open_side_menu={props.open_side_menu}
// hamburger_scrolled={props.hamburger_scrolled}
// leaf_scrolled_so_change_color_down={props.leaf_scrolled_so_change_color_down}
// leaf_scrolled_so_change_color_up={props.leaf_scrolled_so_change_color_up}
// scroll_dir={props.scroll_dir}
