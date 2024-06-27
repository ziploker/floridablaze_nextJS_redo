"use client"

//import React, { useEffect, useRef } from "react"
import Link from "next/link"
interface Props {
	hamburgerScrolled: string
	openSideMenu: string
	setOpenSideMenu: (word: string) => void
	userState: any
}

export default function SideMenu(props: Props) {
	return (
		<nav
			className={`grid grid-cols-[minmax(10px,1fr)20fr] bg-[#f4f4f4] h-screen text-left fixed w-full top-0 left-0 ${
				props.openSideMenu == "true" ? "transform translate-x-0" : "transform translate-x-full"
			} ${
				props.hamburgerScrolled == "true" ? "pt-[70px]" : "pt-[150px]"
			} ease-linear duration-[.2s] z-20`}
		>
			<div style={{ gridArea: "1/2/-1/-1" }}>
				<a
					className="font-bold tracking-[.1rem] text-[#465772] decoration-[none] ease-linear duration-[.3s] hover:text-[#f7c562]"
					key={1}
					style={{ borderBottom: "2px orange solid" }}
					href="/"
				>
					<span className="mb-[20px] block text-[2rem]">Home</span>
				</a>
				<a
					className="cursor-pointer font-bold tracking-[.1rem] text-[#465772] decoration-[none] ease-linear duration-[.3s] hover:text-[#f7c562]"
					style={{ borderBottom: "2px orange solid" }}
					key={2}
					//onClick={props.executeScrollForLookupSection}
				>
					<span className="mb-[20px] block text-[2rem]">Act</span>
				</a>
				<a
					className="font-bold tracking-[.1rem] text-[#465772] decoration-[none] ease-linear duration-[.3s] hover:text-[#f7c562]"
					key={3}
					style={{ borderBottom: "2px orange solid" }}
					href="#"
				>
					<span className="mb-[20px] block text-[2rem]">Shop</span>
				</a>
				<div
					style={{
						height: "2px",
						background: "linear-gradient(90deg, rgba(223,157,17,1) 56%, rgba(0,212,255,0) 100%)",
					}}
				/>
				<div style={{ paddingTop: "40px" }} key={4}>
					{props.userState.loggedInStatus == "LOGGED_IN"
						? [
								<a
									className="cursor-pointer font-bold tracking-[.1rem] text-[#465772] decoration-[none] ease-linear duration-[.3s] hover:text-[#f7c562]"
									key={"a"}
									onClick={props.handleLogOutClick}
								>
									{" "}
									Logout{" "}
								</a>,
								<span className="mb-[20px] block text-[2rem]" key={"line"}>
									|{" "}
								</span>,
								<Link
									className="cursor-pointer font-bold tracking-[.1rem] text-[#465772] decoration-[none] ease-linear duration-[.3s] hover:text-[#f7c562]"
									key={"b"}
									href="/edit"
								>
									edit{" "}
								</Link>,
						  ]
						: [
								<a
									className="cursor-pointer font-bold tracking-[.1rem] text-[#465772] decoration-[none] ease-linear duration-[.3s] hover:text-[#f7c562]"
									key={"c"}
									onClick={props.doSomething}
								>
									{" "}
									Login |
								</a>,
								<a
									className="cursor-pointer font-bold tracking-[.1rem] text-[#465772] decoration-[none] ease-linear duration-[.3s] hover:text-[#f7c562]"
									key={"d"}
									onClick={props.executeScrollForSection2}
								>
									{" "}
									Signup
								</a>,
						  ]}{" "}
				</div>

				{/* 
          <li key={5}>
  
              <li key={4}>{props.userState.loggedInStatus == "LOGGED_IN" ? [<Link key={"a"} to="/"> Logout | </Link>, <Link key={"b"} to="/edit">edit </Link>] :   [<Link key={"c"} to="/login"> Login |</Link>, <Link key={"d"} to="/signup"> Signup</Link>]  } </li>
  
          </li>
          */}
			</div>
		</nav>
	)
}
