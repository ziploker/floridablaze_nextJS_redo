"use client"
//import Image from "next/image"
import React, { useEffect, useState, useRef } from "react"
interface Props {
	openSideMenu: string
	setOpenSideMenu: (word: string) => void
}
export default function Hamburger(props: Props) {
	const [hamburgerScrolled, setHamburgerScrolled] = React.useState("false")
	const [pixlesFromHamburgerToTop, setPixlesFromHamburgerToTop] = useState(1)
	const hamburgerRef = useRef<HTMLInputElement>(null)
	let listener: any

	useEffect(() => {
		if (hamburgerRef.current) {
			hamburgerRef.current.getBoundingClientRect().top > 37
				? null
				: setPixlesFromHamburgerToTop(hamburgerRef.current.getBoundingClientRect().top - 20)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	useEffect(() => {
		console.log("UseEffect 5555555555555")
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
	}, [hamburgerRef])
	//}, [hamburgerRef, mouseDownHandler]);

	// sets the state so the element can stick
	const handleScroll = () => {
		window.scrollY >= pixlesFromHamburgerToTop + 10
			? setHamburgerScrolled("true")
			: setHamburgerScrolled("false")
	}

	return (
		<div
			className={`${
				hamburgerScrolled === "true"
					? "mt-0 fixed pr-0 top-[17px]"
					: "mt-[8px] grid pr-[22px] top-[initial]"
			}`}
			ref={hamburgerRef}
		>
			<button
				onClick={() => {
					props.setOpenSideMenu(props.openSideMenu == "true" ? "false" : "true")
				}}
			>
				<div />
				<div />
				<div />
			</button>
		</div>
	)
}

// open_side_menu={props.open_side_menu}
// hamburger_scrolled={props.hamburger_scrolled}
// leaf_scrolled_so_change_color_down={props.leaf_scrolled_so_change_color_down}
// leaf_scrolled_so_change_color_up={props.leaf_scrolled_so_change_color_up}
// scroll_dir={props.scroll_dir}

// margin-top: ${(props) => (props.hamburger_scrolled == "true" ? "0px" : "8px")};
// grid-area: 1/2/2/3;
// justify-self: end;
// align-self: center;
// position: ${(props) => (props.hamburger_scrolled == "true" ? "fixed" : "grid")};
// padding-right: ${(props) => (props.hamburger_scrolled == "true" ? "0px" : "22px")};
// //top: 25px;
// right: 22px;
// //transition: all 0.2s linear;

// top: ${(props) => (props.hamburger_scrolled == "true" ? "17px" : "initial")};

// @media only screen and (max-width: 520px) {
//   align-self: start;

//   margin-top: ${(props) => (props.hamburger_scrolled == "true" ? "0px" : "17px")};
// }
