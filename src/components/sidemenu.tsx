"use client"

//import React, { useEffect, useRef } from "react"

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
			}`}
		>
			<div style={{ gridArea: "1/2/-1/-1" }}>
				<a key={1} style={{ borderBottom: "2px orange solid" }} href="/">
					<span>Home</span>
				</a>
				<a
					style={{ borderBottom: "2px orange solid" }}
					key={2}
					//onClick={props.executeScrollForLookupSection}
				>
					<span>Act</span>
				</a>
				<a key={3} style={{ borderBottom: "2px orange solid" }} href="#">
					<span>Shop</span>
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
								<a style={{ fontSize: "4vw" }} key={"a"} onClick={props.handleLogOutClick}>
									{" "}
									Logout{" "}
								</a>,
								<span key={"line"} style={{ fontSize: "4vw" }}>
									|{" "}
								</span>,
								<Link style={{ fontSize: "4vw" }} key={"b"} to="/edit">
									edit{" "}
								</Link>,
						  ]
						: [
								<a style={{ fontSize: "4vw" }} key={"c"} onClick={props.doSomething}>
									{" "}
									Login |
								</a>,
								<a style={{ fontSize: "4vw" }} key={"d"} onClick={props.executeScrollForSection2}>
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
