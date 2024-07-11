import React, { Children, useEffect, useState } from "react"
//import { useSwipeable } from "react-swipeable";
import styled from "styled-components"
import scrollArrow from "../images/scroll-arrow.png"
import Image from "next/image"

const CarouselMain = styled.div`
	//overflow: hidden;
	//margin: 30px auto 10px auto;
	max-width: 1700px;

	@media only screen and (max-width: 357px) {
		margin: 0px auto 10px auto;
	}

	@media only screen and (min-width: 481px) {
		display: none;
	}
`

const CarouselMainInner = styled.div`
	white-space: nowrap;
	transition: transform 0.3s;
	grid-area: 1/1/-1/-1;
`

const CarouselMainItem = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	/* height: 200px; */
	//background-color: green;
	color: #fff;
`

const Indicators = styled.div`
	display: flex;
	justify-content: center;

	button {
		margin: 5px;
	}

	&:button.active {
		background-color: green;
		color: #fff;
	}
`

const LeftArrowButton = styled.button`
	opacity: 0.8;

	grid-area: 1/1/-1/-1;

	align-self: center;
	justify-self: start;
	//background: rgba(255, 255, 255, 0);
	border: 0;
	display: grid;

	cursor: pointer;
	width: 6%;
	height: 33.33%;
	background: rgba(247, 247, 247, 0.6);

	z-index: 1;

	cursor: pointer;

	&:hover {
		//background: orange;
		//background: rgba(54, 54, 54, 0.075);
	}
`

// const LeftArrow = styled.img`
// 	width: 100%;

// 	position: relative;
// 	justify-self: center;
// 	align-self: center;
// 	-webkit-transform: scaleX(-1);
// 	transform: scaleX(-1);
// `

const RightArrowButton = styled.button`
	opacity: 0.8;

	grid-area: 1/1/-1/-1;

	align-self: center;
	justify-self: end;
	//background: rgba(255, 255, 255, 0);
	border: 0;
	display: grid;
	cursor: pointer;

	width: 6%;
	height: 33.33%;
	background: rgba(247, 247, 247, 0.6);

	/* &:hover {
    background: rgba(54, 54, 54, 0.075);
  } */
`

// const RightArrow = styled.img`
// 	width: 100%;

// 	position: relative;
// 	justify-self: center;
// 	align-self: center;
// `

const CarouselArrowsWrapper = styled.div`
	display: grid;
	//grid-template-columns: 25px 1fr 25px;
	width: 100%;
	height: 100%;
`
export const CarouselItem = ({ children, width }: any) => {
	//console.log("children----", children);
	return (
		<CarouselMainItem className="carousel-item" style={{ width: width }}>
			{children}
		</CarouselMainItem>
	)
}

const Carousel = ({ children, handleReversePage, handleForwardPage }: any) => {
	//const [activeIndex, setActiveIndex] = useState(0);
	const [paused, setPaused] = useState(false)

	// const updateIndex = (newIndex) => {
	// if (newIndex < 0) {
	// newIndex = React.Children.count(children) - 1;
	// } else if (newIndex >= React.Children.count(children)) {
	// newIndex = 0;
	// }

	// setActiveIndex(newIndex);
	// };

	useEffect(() => {
		// const interval = setInterval(() => {
		//   if (!paused) {
		//     updateIndex(activeIndex + 1);
		//   }
		// }, 3000);
		// return () => {
		//   if (interval) {
		//     clearInterval(interval);
		//   }
		// };
	})

	//   const handlers = useSwipeable({
	//     onSwipedLeft: () => handleForwardPage("cellphone"),
	//     onSwipedRight: () => handleReversePage("cellphone"),
	//   });

	return (
		<CarouselMain
			//{...handlers}
			className="carousel"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
		>
			<CarouselArrowsWrapper>
				<LeftArrowButton
					className="cursor-pointer bg-stone-400/50 hover:bg-stone-400"
					onClick={() => handleForwardPage("cellphone")}
				>
					<Image
						src={scrollArrow.src}
						alt=""
						className={`w-[39px] h-[39px] relative justify-self-center self-center -scale-[1]`}
						width={39}
						height={39}
					></Image>
				</LeftArrowButton>
				<CarouselMainInner
					className="inner"
					//style={{ transform: `translateX(-${activeIndex * 100}%)` }}
				>
					{React.Children.map(children, (child, index) => {
						return React.cloneElement(child, { width: "100%" })
					})}
				</CarouselMainInner>
				<RightArrowButton
					onClick={() => {
						//updateIndex(activeIndex + 1);

						handleReversePage("cellphone")
					}}
				>
					<Image
						src={scrollArrow.src}
						alt=""
						className={`w-[39px] h-[39px] relative justify-self-center self-center `}
						width={39}
						height={39}
					></Image>
				</RightArrowButton>
			</CarouselArrowsWrapper>
			{/* <Indicators className="indicators">
				{React.Children.map(children, (child, index) => {
					return (
						<button
						// className={`${index === activeIndex ? "active" : ""}`}
						// onClick={() => {
						// 	updateIndex(index);
						// }}
						>
							{index + 1}
						</button>
					);
				})}
			</Indicators> */}
		</CarouselMain>
	)
}

export default Carousel
