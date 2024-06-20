"use client"

import Link from "next/link"

interface Props {
	loggedInStatus?: string
	userState?: any
}

export default function LongNav(props: Props) {
	return (
		<nav
			className={`hidden longNav_bp_600:flex grid-in-[right] justify-self-end self-center text-white mt-0 mb-0 ml-[-25px] mr-[-25px]`}
		>
			<ul>
				<li key={0}>news</li>
				{/* <li key={1} onClick={props.executeScrollForLookupSection}>*/}
				<li key={1}>act</li>
				<li key={2}>shop</li>

				{props.userState.loggedInStatus == "LOGGED_IN"
					? [
							<li style={{ padding: "0 0 0 4px", fontSize: ".75rem" }} key={3}>
								{/* <a key={"a"} onClick={props.handleLogOutClick}>*/}
								<a key={"a"}>Logout</a>
							</li>,
							<span key={4} style={{ fontSize: ".8em", padding: "0 2px" }}>
								|
							</span>,
							<li style={{ padding: "0" }} key={5}>
								<Link style={{ textDecoration: "none", fontSize: ".75rem" }} key={"b"} href="/edit">
									edit
								</Link>
							</li>,
					  ]
					: [
							<li style={{ padding: "0 0 0 4px", fontSize: ".75rem" }} key={6}>
								{/*<a key={"c"} onClick={doSomething}>*/}
								<a key={"c"}>Login</a>
							</li>,
							<span key={7} style={{ fontSize: ".8em", padding: "0 2px" }}>
								|
							</span>,
							<li style={{ padding: "0", fontSize: ".75rem" }} key={8}>
								{/*<a key={"d"} onClick={props.executeScrollForSection2}>*/}
								<a key={"d"}>Signup</a>
							</li>,
					  ]}
			</ul>
		</nav>
	)
}
