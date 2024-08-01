"use client"
import React, { useEffect, useState, usePrevious, useRef, Suspense } from "react"

import styled from "styled-components"

import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import CommentReplyForm from "../components/commentReplyForm"
//import defaultAvatar from "../images/dummy_avatar.png";
//import axios from "axios";
//import DrawingFilled from "../../assets/images/drawingFilled.svg";
//import { ReactComponent as SvgSmiley } from "../../assets/images/drawingFilled.svg";
import ThumbsUpSvg from "./thumbsUpSvg"
import ThumbsDownSvg from "./thumbsDownSvg"

import CommentForm from "../components/commentForm"

import ReactTimeAgo from "react-time-ago"

import "../css/commentStyles.css"

// import {
// 	FacebookShareButton,
// 	FacebookIcon,
// 	TwitterShareButton,
// 	TwitterIcon,
// 	WhatsappShareButton,
// 	WhatsappIcon,
// } from "react-share"

//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

TimeAgo.addDefaultLocale(en)

////////////// Styled Components//////////////////////////////////

// const Comments = styled.div`
// 	grid-area: 6/1/7/2;
// 	margin-bottom: 80px;
// `

const CommentDisplay = styled.div`
	max-height: 100%;

	margin: 0px 0px 0px 25px;
	position: relative;

	img {
		width: 25px;
		height: 25px;
		//grid-area: avatar;
		margin: 1px 10px 0px 0px;
		border-radius: 50%;
		border: 1px solid gray;
	}
`

const BorderDiv = styled.div`
	position: absolute;
	border-left: 1px solid gray;
	opacity: 0.3;

	height: calc(100% - 34px);
	width: 100%;

	margin-left: 12px;

	bottom: 8px;
	pointer-events: none;
`

const CommentBody = styled.p`
	overflow-wrap: break-word;
	word-wrap: break-word;

	-ms-word-break: break-all;

	word-break: break-word;
	padding-left: 35px;
`

const Reply = styled.div`
	color: rgba(7, 7, 7, 0.65);
	cursor: pointer;
	padding: 8px 8px 8px 0px;
	// font-size: 14px;

	&:hover {
		color: black;
	}
`

const TopBarWrapper = styled.div`
	display: flex;
	position: relative;
	z-index: -1;
`

const BottomBarWrapper = styled.div`
	grid-area: bottomBar;
	display: flex;
	flex-direction: row;
	padding-left: 35px;
	align-items: center;
`

const VoteUp = styled.div`
	cursor: pointer;
	padding: 8px;

	&:hover {
		background-color: #e5f4fb;
	}

	svg {
		width: 16px;
		height: 15px;
		margin-right: 4px;
	}

	span {
		// font-size: 13px;
	}
`

const VoteDown = styled.div`
	cursor: pointer;
	padding: 8px;

	&:hover {
		background-color: #e5f4fb;
	}

	svg {
		width: 16px;
		height: 15px;
		margin-right: 4px;
	}

	span {
		// font-size: 13px;
	}
`

const CommentFormWrapper = styled.div`
	margin: 0 0 30px 0;
	grid-area: 7/1/8/2;
`

////////////// CommentSection //////////////////////////////////

function CommentSection(props) {
	console.log("==============Comment Section===============")
	console.log("==============Comment Section Props===============", props)

	const [artDataComments, setArtDataComments] = useState([])
	//const [isCommentsLoading, setIsCommentsLoading] = useState(true);

	const allShowMoreRefs = useRef([])
	allShowMoreRefs.current = []

	const allReplyRefs = useRef([])
	allReplyRefs.current = []

	const allVoteUpRefs = useRef([])
	allVoteUpRefs.current = []

	const allVoteDownRefs = useRef([])
	allVoteDownRefs.current = []

	const { slug } = props

	useEffect((props) => {
		console.log("==============Article useEffect===============")

		//const mode =
		// process.env.NODE_ENV == "development"
		//   ? "http://127.0.0.1:3000"
		//   : "https://www.floiridablaze.io";

		// // // axios
		// // //   .post(
		// // //     "/blog/get_comment_info",
		// // //     {
		// // //       data: {
		// // //         slug: slug,
		// // //       },
		// // //     },
		// // //     { withCredentials: true }
		// // //   )
		// // //   .then((response) => {
		// // //     //console.log("resoooooooooooooooonse = " + response.inspect)

		// // //     //addAllCommentsToStateForReplyButtonToWork(response.data.comments)
		// // //     //addAllCommentsToStateForShowMoreButtonToWork(response.data.comments)

		// // //     //setArtData(response.data.article)
		// // //     setArtDataComments(response.data.comments);

		// // //     //setIsCommentsLoading(false)

		// // //     //setIsCommentsLoading(false)

		// // //     //setCurrentUser(@current_user)
		// // //   })
		// // //   .catch((error) => {
		// // //     //console.log("articleErrors", error)
		// // //   });
	}, [])

	const getReplyArray = (childrenCommentArray) => {
		let tempArray = []

		childrenCommentArray.map((x, i) => {
			x.id
			tempArray.push(x.id + ", ")
		})

		return tempArray.length > 0 ? tempArray : "blank"
	}

	const handleReplyButton = (childrenCommentArray, e, itemID) => {
		//     if (props.rows[id] == "true"){
		//         props.setRows({...props.rows, [id]: "false"})

		//    }else{

		//     props.setRows({...props.rows,[id]: "true"})

		//    }

		console.log(" in handle reply button ------------------------")
		console.log(allReplyRefs.current.length)

		allReplyRefs.current.map((current, i) => {
			console.log(itemID + "<><><>" + current.id.substr(0, current.id.indexOf("-")))

			if (itemID == current.id.substr(0, current.id.indexOf("-"))) {
				console.log("find ref loop start")

				if (current.classList.contains("replyForm")) {
					current.classList.remove("replyForm")
					console.log("removed class")
				} else {
					current.classList.add("replyForm")
					console.log("added class")
				}

				console.log("find ref loop end")
			}
		})
	}

	const handleShowMoreButton = (childrenCommentArray, e, itemID) => {
		//set the label
		if (e.target.innerText == "hide replies") {
			e.target.innerText = "show replies"
			console.log("afterchange case1", e.target.innerText)
		} else {
			e.target.innerText = "hide replies"
			console.log("afterchange case2", e.target.innerText)
		}

		//get the ref(s) and change the css
		childrenCommentArray.map((item) => {
			allShowMoreRefs.current.map((current, i) => {
				console.log(item.id + " )( " + current.id)

				if (item.id == current.id) {
					if (current.classList.contains("shrink")) {
						current.classList.remove("shrink")
					} else {
						current.classList.add("shrink")
					}
				}
			})
		})
	}

	//when someone clicks on the upvote
	const handleVoteUp = (e, itemID) => {
		console.log(
			"Handle VoteUp Start sending axios request to rails server with item id " + itemID,
			e
		)

		// // // axios
		// // //   .post(
		// // //     "/blog/vote_up",
		// // //     {
		// // //       data: {
		// // //         itemID: itemID,
		// // //       },
		// // //     },
		// // //     { withCredentials: true }
		// // //   )
		// // //   .then((response) => {
		// // //     handleVoteUpResponse(response.data.comment_id, response.data.status);
		// // //     ///voteUpAnimate(response.data.comment_id)

		// // //     console.log("#######", response.data);
		// // //   })
		// // //   .catch((error) => {
		// // //     console.log("handleVoteUp errors if any are ", error);
		// // //   });
	}

	//handle vote up based on rails response (status)
	const handleVoteUpResponse = (commentID, status) => {
		console.log(
			"inside handleVoteUpResponse",
			"commentID is = " + commentID + "and status is = " + status
		)

		//find ref
		allVoteUpRefs.current.map((current, i) => {
			if (current.offsetParent.id == commentID) {
				console.log("FOUND THE REFFF", current)

				if (status == "voteup_undo") {
					current.innerText = parseInt(current.innerText) - 1
					current.parentElement.classList.remove("selected")
				} else if (status == "voteup_toggle") {
					current.innerText = parseInt(current.innerText) + 1
					current.parentElement.classList.add("selected")

					allVoteDownRefs.current.map((current, i) => {
						if (current.offsetParent.id == commentID) {
							current.innerText = parseInt(current.innerText) - 1
							current.parentElement.classList.remove("down_vote_selected")
						}
					})
				} else if (status == "voteup") {
					current.innerText = parseInt(current.innerText) + 1
					// current.parentElement.className = current.parentElement.className + " selected"
					current.parentElement.classList.add("selected")
				}
			}
		})
	}

	const handleVoteDown = (e, itemID) => {
		console.log(
			"Handle VoteDown Start sending axios request to rails server with item id " + itemID,
			e
		)

		// // // axios
		// // //   .post(
		// // //     "/blog/vote_down",
		// // //     {
		// // //       data: {
		// // //         itemID: itemID,
		// // //       },
		// // //     },
		// // //     { withCredentials: true }
		// // //   )
		// // //   .then((response) => {
		// // //     handleVoteDownResponse(response.data.comment_id, response.data.status);
		// // //     voteUpAnimate(response.data.comment_id);
		// // //   })
		// // //   .catch((error) => {
		// // //     console.log("handleVoteDown errors if any are ", error);
		// // //   });
	}

	const handleVoteDownResponse = (commentID, status) => {
		console.log(
			"inside handleVoteDownResponse",
			"commentID is = " + commentID + "and status is = " + status
		)

		//find ref
		allVoteDownRefs.current.map((current, i) => {
			if (current.offsetParent.id == commentID) {
				console.log("FOUND THE REFFF", current)

				if (status == "votedown_undo") {
					current.innerText = parseInt(current.innerText) - 1
					current.parentElement.classList.remove("down_vote_selected")
				} else if (status == "votedown_toggle") {
					current.innerText = parseInt(current.innerText) + 1
					current.parentElement.classList.add("down_vote_selected")

					allVoteUpRefs.current.map((current, i) => {
						if (current.offsetParent.id == commentID) {
							current.innerText = parseInt(current.innerText) - 1
							current.parentElement.classList.remove("selected")
						}
					})
				} else if (status == "votedown") {
					current.innerText = parseInt(current.innerText) + 1
					current.parentElement.classList.add("down_vote_selected")
				}
			}
		})
	}

	//function called recursivley
	const Comment = ({
		item,
		userState,
		storyID,
		setArtDataComments,
		handleShowMoreButton,
		handleReplyButton,
	}) => {
		console.log(
			"+++++++++++++++++++++++++++++++++++runit+++++++++++++++++++++++++++++++++++++++++++++++++++"
		)

		const addToShowMoreRefs = (el) => {
			//console.log("size b4 going in addToShowMoreRefs is ", allShowMoreRefs.current.length )
			console.log("in================= addTo_ShowMore_Refs")

			if (el && !allShowMoreRefs.current.includes(el)) {
				//console.log("inside================= addToShowMoreRefs and el is = " + JSON.stringify(el, null, 4))
				//console.log(el)
				allShowMoreRefs.current.push(el)
				console.log("size after adding one is ", allShowMoreRefs.current.length + " sm")
			}
		}

		const addToReplyRefs = (el) => {
			//console.log("size b4 going in addToReplyeRefs is ", allReplyRefs.current.length )
			console.log("in================= addTo_Reply_Refs")

			if (el && !allReplyRefs.current.includes(el)) {
				//console.log("inside================= addToReplyeRefs")
				//console.log(el)
				allReplyRefs.current.push(el)
				console.log("size after adding one is ", allReplyRefs.current.length)
			}
		}

		const addToVoteUpRefs = (el) => {
			//console.log("size b4 going in addToShowMoreRefs is ", allShowMoreRefs.current.length )
			console.log("in================= addTo_VoteUp_Refs")

			if (el && !allVoteUpRefs.current.includes(el)) {
				//console.log("inside================= addToShowMoreRefs and el is = " + JSON.stringify(el, null, 4))
				//console.log(el)
				allVoteUpRefs.current.push(el)
				console.log("size after adding one is ", allVoteUpRefs.current.length + " sm")
			}
		}

		const addToVoteDownRefs = (el) => {
			//console.log("size b4 going in addToShowMoreRefs is ", allShowMoreRefs.current.length )
			console.log("in================= addTo_VoteDown_Refs")

			if (el && !allVoteDownRefs.current.includes(el)) {
				//console.log("inside================= addToShowMoreRefs and el is = " + JSON.stringify(el, null, 4))
				//console.log(el)
				allVoteDownRefs.current.push(el)
				console.log("size after adding one is ", allVoteDownRefs.current.length + " sm")
			}
		}

		const liker = (arrayOfLikers) => {
			let match = 0

			arrayOfLikers.map((i) => {
				if (i == props.userState.user.id) {
					match = match + 1
				}
			})

			if (match > 0) {
				return "selected"
			}
		}

		const disliker = (arrayOfDislikers) => {
			let match = 0

			arrayOfDislikers.map((i) => {
				if (i == props.userState.user.id) {
					match = match + 1
				}
			})

			if (match > 0) {
				return "down_vote_selected"
			}
		}

		const nestedComments = (item.comments || []).map((com) => {
			return (
				<div key={item.id}>
					<Comment
						style={{ border: "2px solid blue" }}
						item={com}
						type="child"
						userState={userState}
						storyID={storyID}
						setArtDataComments={setArtDataComments}
						handleShowMoreButton={handleShowMoreButton}
						handleReplyButton={handleReplyButton}
					/>
				</div>
			)
		})

		return (
			<CommentDisplay
				ref={addToShowMoreRefs}
				className={"replies"}
				key={item.id + "commentDisplay"}
				item={item}
				id={item.id}
			>
				<BorderDiv />

				<TopBarWrapper>
					<img src={item.author_avatar} alt="" />
					<h3
						style={{
							alignSelf: "center",
							fontSize: ".6em",
							gridArea: "nick",
							marginRight: "8px",
						}}
					>
						{item.author_nick}
					</h3>
					<span
						style={{
							alignSelf: "center",
							gridArea: "date",
							fontSize: ".6em",
							color: "gray",
						}}
					>
						<ReactTimeAgo
							key={item.id + "rta"}
							data-id={item.id + "rta"}
							date={item.created_at ? new Date(item.created_at) : null}
							locale="en-US"
							timeStyle="round-minute"
						/>
					</span>
				</TopBarWrapper>

				<CommentBody style={{ gridArea: "body", fontSize: "15px" }}>{item.body}</CommentBody>

				<BottomBarWrapper>
					<Reply onClick={(e) => handleReplyButton(item.comments, e, item.id)}>reply</Reply>

					<VoteUp
						className={liker(item.array_of_likers)}
						onClick={(e) => {
							handleVoteUp(e, item.id)
						}}
					>
						{/* <svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path key={item.id + "path1"} data-id={ item.id + "path1"} d="M10.74.04a2.013 2.013 0 00-1.58 1.88c-.11 2.795-.485 4.45-2.283 6.946a1.272 1.272 0 00-1.065-.58h-4.55C.573 8.287 0 8.84 0 9.507v8.773c0 .667.572 1.218 1.263 1.218h4.55c.435 0 .821-.22 1.049-.548.263.204.506.387.758.533.417.24.887.384 1.532.45 1.29.128 3.403.032 8.283.052a.53.53 0 00.317-.113c1.224-.667 4.255-5.775 4.248-10.534-.026-1.138-.542-1.78-1.532-1.78H13.96c.388-2.47.131-4.738-.735-6.208C12.76.555 12.078.111 11.403.018a2.035 2.035 0 00-.663.022m2.154 7.912c-.055.28.201.58.498.58h6.934c.356.035.67.091.67.913 0 1.047-.168 2.886-1.031 5.057-.865 2.172-2.155 4.531-2.603 4.455-1.215.08-7.014.109-8.108 0-.556-.056-.818-.135-1.113-.306-.266-.152-.59-.423-1.066-.791v-7.6c2.349-2.88 2.979-5.302 3.096-8.3.338-1.495 1.702-1.082 2.179-.13.697 2.402.879 4.442.544 6.122M1.263 9.262h4.55c.148 0 .251.1.251.244v8.773c0 .144-.103.243-.252.243h-4.55c-.148 0-.251-.099-.251-.243V9.506c0-.144.103-.244.252-.244"></path></svg> */}
						{console.log("ITEM IN QUESTION", item)}

						<ThumbsUpSvg width="18px" viewBox="0 0 22 20" />

						<span ref={addToVoteUpRefs} commentid={item.id}>
							{item.total_upvotes}
						</span>
					</VoteUp>

					<VoteDown
						className={disliker(item.array_of_dislikers)}
						onClick={(e) => {
							handleVoteDown(e, item.id)
						}}
					>
						<ThumbsDownSvg width="18px" viewBox="0 0 22 20" />
						<span ref={addToVoteDownRefs} commentid={item.id}>
							{item.total_downvotes}
						</span>
					</VoteDown>

					<span
						style={{
							cursor: "pointer",
							marginLeft: "10px",
							fontSize: "10px",
							lineHeight: "40px",
						}}
						onClick={(e) => handleShowMoreButton(item.comments, e, item.id)}
					>
						{" "}
						{item.comments === undefined || item.comments.length == 0 ? "" : "hide replies"}
					</span>
				</BottomBarWrapper>

				<CommentReplyForm
					addToReplyRefs={addToReplyRefs}
					ref={allReplyRefs}
					originalcommentAuthor={item.author_nick}
					//rows={rows}
					//setRows={setRows}
					userState={userState}
					storyID={storyID}
					commentid={item.id}
					setArtDataComments={setArtDataComments}
					handleReplyButton={handleReplyButton}
				/>

				{nestedComments}
			</CommentDisplay>
		)
	}

	return (
		<div className="mb-[80px]" style={{ gridArea: "6/1/7/2" }}>
			<CommentFormWrapper>
				<CommentForm
					userState={props.userState}
					storyID={props.artData.id}
					setArtDataComments={setArtDataComments}
				/>
			</CommentFormWrapper>

			<div>
				<div style={{ position: "relative" }}>
					{artDataComments.map((c, i) => {
						console.log("cccccccccccccccccccccccccccccc", artDataComments)

						return (
							<div key={c.id}>
								<Comment
									item={c}
									userState={props.userState}
									storyID={props.artData.id}
									setArtDataComments={setArtDataComments}
									handleShowMoreButton={handleShowMoreButton}
									handleReplyButton={handleReplyButton}
								/>
							</div>
						)
					})}
				</div>
			</div>

			{/* <Suspense fallback={<h1>Loading profile...</h1>}>


                </Suspense>
     */}
		</div>
	)
}

export default CommentSection
