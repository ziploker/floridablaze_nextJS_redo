"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";

//import Login from "./pages/login"
import defaultImage from "../images/defaultImage.jpg";

//import { Link } from "react-router-dom"
import Link from "next/link";
import scrollArrow from "../images/scroll-arrow.png";
//import axios from "axios"
//import { gsap } from "gsap"
import "../css/home.css";
//import { _parseRelative } from "gsap/gsap-core"
import "../css/home_story_spinner.css";
import "../css/dots.css";
//import Carousel, { CarouselItem } from "./carousel";
import debounce from "debounce";

import Image from "next/image";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//import Dots from "react-carousel-dots";

//
//
//
//
//
//

// const HomeWrapper = styled.div`
// 	//background: pink;
// 	min-width: 275px;
// 	line-height: 1.3;
// 	//height: calc(100vh - 85px);
// 	//max-height: 500px;
// 	overflow: hidden;
// 	//min-width: 500px;

// 	display: ${(props) => (props.show_offer == "true" ? "none" : "block")};
// `

// const LeftArrowButton = styled.div`
// 	cursor: pointer;
// 	width: 6%;
// 	height: 33.33%;
// 	background: ${(props) =>
// 		props.is_hovering == "true" ? "rgba(247, 247, 247, 0.6)" : "rgba(247, 247, 247, 0.27)"};
// 	border: 0;
// 	display: grid;
// 	z-index: 1;
// 	grid-area: one;
// 	justify-self: start;
// 	align-self: center;

// const LinkWrapper1 = styled(Link)`
// 	grid-area: 1/1/-1/-1;

// 	width: 100%;
// 	justify-self: center;
// 	display: grid;

// 	@media only screen and (min-width: 481px) {
// 		grid-area: one;
// 		width: 100%;
// 		justify-self: center;
// 		display: grid;
// 	}
// `

// const LinkWrapper2 = styled(Link)`

// 	grid-area: 1/1/-1/-1;

// 	width: 100%;
// 	justify-self: center;
// 	display: grid;
// 	@media only screen and (min-width: 480px) {
// 		grid-area: two;
// 		width: 100%;
// 		justify-self: center;
// 		display: grid;
// 	}
// `

// const Img1 = styled.img`
// 	box-shadow: 0 2px 5px 0 rgba(227, 181, 90, 0.2);
// 	position: relative;
// 	border-radius: 10px;
// 	width: 100%;
// `

// const Img2 = styled.img`
// 	box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
// 	position: relative;
// 	border-radius: 10px;

// 	width: 100%;
// `

// const Div1OverlayWrapper = styled.div`
// 	pointer-events: none;
// 	word-break: break-all;

// 	grid-area: 1/1/-1/-1;
// 	border-radius: 10px;
// 	overflow: hidden;

// 	width: 100%;

// 	justify-self: center;
// 	line-height: 1.2;

// 	display: grid;
// 	z-index: 1;
// 	white-space: nowrap;
// 	background: rgb(0, 0, 0);
// 	background: -moz-linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(255, 145, 145, 0) 60%);
// 	background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(255, 145, 145, 0) 60%);
// 	background: linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(255, 145, 145, 0) 60%);
// 	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#ff9191",GradientType=1);

// 	@media only screen and (min-width: 481px) {
// 		grid-area: one;
// 	}
// `

// const Div2OverlayWrapper = styled(Div1OverlayWrapper)`
// 	//grid-area: two;
// 	grid-area: 1/1/-1/-1;

// 	@media only screen and (min-width: 480px) {
// 		grid-area: two;
// 	}
// `

// const StoryOneTitle = styled.h2`
// 	white-space: pre-wrap;
// 	word-break: break-word;

// 	color: white;

// 	padding: 0px 13px 8px 13px;
// 	width: 100%;

// 	align-self: end;
// 	justify-self: center;
// 	text-align: center;
// 	font-size: 2rem;

// 	@media only screen and (max-width: 1000px) {
// 		font-size: 1.5rem;
// 	}
// 	@media only screen and (max-width: 700px) {
// 		font-size: 1rem;
// 	}
// 	@media only screen and (max-width: 480px) {
// 		font-size: 2rem;
// 	}
// 	h2 {
// 		word-break: break-all;
// 	}
// `

// const LeftArrow = styled.img`
// 	width: 100%;

// 	position: relative;
// 	justify-self: center;
// 	align-self: center;
// 	-webkit-transform: scaleX(-1);
// 	transform: scaleX(-1);
//`

// const RightArrowButton = styled.button`

// 	cursor: pointer;
// 	width: 6%;
// 	height: 33.33%;
// 	background: ${(props) =>
// 		props.is_hovering == "true" ? "rgba(247, 247, 247, 0.6)" : "rgba(247, 247, 247, 0.27)"};
// 	border: 0;
// 	display: grid;
// 	z-index: 1;
// 	grid-area: two;
// 	justify-self: end;
// 	align-self: center;
// `

// const RightArrow = styled.img`
// 	width: 100%;

// 	position: relative;
// 	justify-self: start;
// 	align-self: center;
// `

//
//
//
//
//
//

// const gsapSwipeAnimation = () => {
// 	console.log("gsapSwipeAnimationgsapSwipeAnimationgsapSwipeAnimation")
// 	gsap.to(
// 		".s1",

// 		{
// 			x: "-500%",
// 			duration: 0.2,
// 		}
// 	)

// 	gsap.fromTo(
// 		".s1",
// 		{ x: "300%" },
// 		{
// 			x: "initial",

// 			duration: 0.2,
// 			delay: 0.1,
// 		}
// 	)

// 	gsap.to(
// 		".s2",

// 		{
// 			x: "-500%",
// 			duration: 0.2,
// 		}
// 	)

// 	gsap.fromTo(
// 		".s2",
// 		{ x: "300%" },
// 		{
// 			x: "initial",

// 			duration: 0.2,
// 			delay: 0.1,
// 		}
// 	)
// }

// const gsapSwipeAnimationReverse = () => {
// 	console.log("gsapSwipeAnimationReversegsapSwipeAnimationReversegsapSwipeAnimationReverse")
// 	gsap.to(".s1", {
// 		x: "500%",
// 		duration: 0.2,
// 	})
// 	gsap.fromTo(
// 		".s1",
// 		{ x: "-300%" },
// 		{
// 			x: "initial",
// 			duration: 0.2,
// 			delay: 0.1,
// 		}
// 	)
// 	gsap.to(".s2", {
// 		x: "500%",
// 		duration: 0.2,
// 	})
// 	gsap.fromTo(
// 		".s2",
// 		{ x: "-300%" },
// 		{
// 			x: "initial",
// 			duration: 0.2,
// 			delay: 0.1,
// 		}
// 	)
// }

// const gsapDeadEndAnimation = () => {
// 	gsap.to(
// 		".s1",

// 		{
// 			x: "-10%",
// 			duration: 0.2,
// 		}
// 	)
// 	gsap.to(
// 		".s1",

// 		{
// 			x: "0",
// 			duration: 0.9,
// 		}
// 	)
// }

export default function HomeClient(props: any) {
  // const gsapContainer1 = useRef()
  // const gsapContainer2 = useRef()
  const isMountedForVisibleDotsUseEffect = useRef(false);
  const isMountedForactiveDotUseEffect = useRef(false);
  const whatMode = useRef("");
  const whatDirection = useRef("");
  const rightArrowRef = useRef(null);
  const leftArrowRef = useRef(null);

  const [whatModeAuto, setWhatModeAuto] = useState("");

  const [loadingStories, setLoadingStories] = React.useState(false);
  const [activeStories, setActiveStories] = useState([0, 1]);
  const [activeDot, setActiveDot] = useState(0);
  const [visibleDots, setVisibleDots] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  const [transitionX, setTransitionX] = useState(60);
  const [isHovering, setIsHovering] = useState("false");
  const [isPageLoded, setIsPageLoded] = useState(false);

  //
  //
  //

  console.log("ALLSTORIES", props.allStories);

  const showOffer = false;
  //sets initial sories to local state for caching
  useEffect(() => {
    // // if (
    // // 	window.localStorage !== null &&
    // // 	window.localStorage.getItem("allStories") !== null &&
    // // 	JSON.parse(window.localStorage.getItem("allStories") as string).length > 0 &&
    // // 	props.allStoriesFromController.length > 0
    // // ) {
    // // 	console.log(
    // // 		"compare it LOCAL=======",
    // // 		JSON.parse(window.localStorage.getItem("allStories") as string)[0].id
    // // 	)

    // // 	if (
    // // 		props.allStoriesFromController[0].id ==
    // // 		JSON.parse(window.localStorage.getItem("allStories") as string)[0].id
    // // 	) {
    // // 		props.setAllStories(JSON.parse(window.localStorage.getItem("allStories") as string))
    // // 	}

    // console.log(
    // 	"check to see whats up with localstorage",
    // 	typeof window.localStorage.getItem("allStories")
    // )
    //}
    setIsPageLoded(true);
    // }
  }, []);

  useEffect(() => {
    function setModeAutoUseState() {
      if (window.innerWidth <= 480) {
        setWhatModeAuto("cellphone");
      } else {
        setWhatModeAuto("desktop");
      }
    }

    if (window.innerWidth <= 480) {
      setWhatModeAuto("cellphone");
    } else {
      setWhatModeAuto("desktop");
    }

    window.addEventListener("resize", setModeAutoUseState);

    //return () => window.removeEventListener("resize", setModeAutoUseState)
  }, []);

  //
  //
  //sets props.allStories to local state for caching every time new stories are scrolled
  useEffect(() => {
    function toObject(stuff: any) {
      return JSON.parse(
        JSON.stringify(
          stuff,
          (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
        )
      );
    }

    if (window.localStorage !== null) {
      window.localStorage.setItem("allStories", toObject(props.allStories));
    }
  }, [props.allStories]);

  //
  //
  //shifts the indicator dots to the left everytime visibleDots changes
  useEffect(() => {
    console.log(
      "inUSeEffEct for visibledots, whatDirection.current is " +
        whatDirection.current
    );
    if (isMountedForVisibleDotsUseEffect.current) {
      if (whatMode.current == "cellphone") {
        if (whatDirection.current == "reverse") {
          if (visibleDots[7] - 3 == props.allStories.length) {
            console.log("AT the ned of the line");
          } else {
            console.log(
              "settttttttttttttttttttttttttttttttttting TTTTTTTTTTTT"
            );
            setTransitionX((pre) => pre - 20);
          }
        } else if (whatDirection.current == "forward") {
          //doesnt happen here unless clickhandler logis says so
          setTransitionX((pre) => pre + 20);
        }
      } else if (whatMode.current == "desktop") {
        if (whatDirection.current == "reverse") {
          //   if (visibleDots[7] - 3 == props.allStories.length) {
          //     console.log("AT the ned of the line");
          //   } else {
          setTransitionX((pre) => pre - 40);
          //}
        } else if (whatDirection.current == "forward") {
          //   if (visibleDots[0] == 0) {
          //     console.log("AT the eNd of the line");
          //     setTransitionX((pre) => pre + 40);
          //   } else {
          setTransitionX((pre) => pre + 40);
          //}
        }
      }
    } else {
      isMountedForVisibleDotsUseEffect.current = true;
    }
  }, [visibleDots]);

  //
  //
  //changes Stories and activeDot position everytime activeDot changes
  useEffect(() => {
    if (isMountedForactiveDotUseEffect.current) {
      const mode = whatMode.current;
      const direction = whatDirection.current;

      //REVERSE DOT LOGIC & STORY LOGIC
      if (direction == "reverse") {
        if (mode == "cellphone") {
          reverseCellphoneDotLogic();
        } else if (mode == "desktop") {
          reverseDesktopDotLogic();
        }

        reverseStoryLogic(mode, direction);

        //FORWARD DOT LOGIC & STORY LOGIC
      } else if (direction == "forward") {
        if (mode == "cellphone") {
          forwardCellphoneDotLogic();
        } else if (mode == "desktop") {
          forwardDesktopDotLogic();
        }

        forwardStoryLogic(mode, direction);
      }
    } else {
      isMountedForactiveDotUseEffect.current = true;
    }
  }, [activeDot]);

  useEffect(() => {
    if (props.goToActNow == "true") {
      console.log("goToActnow was true");
      props.executeScrollForLookupSection();
    } else {
      console.log("goToActnow was false");
    }
  }, []);

  //
  //
  //
  //

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 484 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 484, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  function reverseCellphoneDotLogic() {
    if (activeDot + 3 == visibleDots[8]) {
      console.log("Setting visisble dots by 1");
      setVisibleDots((pre) => {
        let newArray = [] as any;

        pre.map((n, i) => {
          newArray[i] = n + 1;
        });

        return newArray;
      });
    } else {
      console.log(
        "Dont change visisble dots Logic etc.........................."
      );
    }
  }

  function reverseDesktopDotLogic() {
    if (activeDot + 3 == visibleDots[7]) {
      let StoriesLeftInArray = props.allStories.length - (activeStories[1] + 1);
      console.log(
        "props.allStories.length - activeStories[1] " + StoriesLeftInArray
      );
      if (StoriesLeftInArray < 2) {
        setVisibleDots((pre) => {
          let newArray = [] as any;

          pre.map((n, i) => {
            newArray[i] = n + 1;
          });

          return newArray;
        });
      } else {
        setVisibleDots((pre) => {
          let newArray = [] as any;

          pre.map((n, i) => {
            newArray[i] = n + 2;
          });

          return newArray;
        });
      }
    } else if (activeDot + 4 == visibleDots[9]) {
      setVisibleDots((pre) => {
        let newArray = [] as any;

        pre.map((n, i) => {
          newArray[i] = n + 2;
        });

        return newArray;
      });
    }
  }

  function forwardCellphoneDotLogic() {
    if (activeDot + 4 == visibleDots[3]) {
      setVisibleDots((pre) => {
        let newArray = [] as any;
        pre.map((n, i) => {
          newArray[i] = n - 1;
        });
        return newArray;
      });
    }
  }

  function forwardDesktopDotLogic() {
    console.log("=> forwardDesktopDotLogic");
    if (activeDot + 3 == visibleDots[2] || activeDot + 3 == visibleDots[1]) {
      setVisibleDots((pre) => {
        let newArray = [] as any;
        pre.map((n, i) => {
          newArray[i] = n - 2;
        });
        return newArray;
      });
    } else {
    }
  }

  function reverseStoryLogic(mode: any, direction: any) {
    console.log("inside reverse story logic");
    let storiesLeft = props.allStories.length - (activeStories[1] + 1);
    console.log("stories left = " + storiesLeft);
    console.log("mode = " + mode);
    let atLastStory = false;

    if (activeStories[0] + 1 == props.allStories.length) {
      atLastStory = true;
    }

    if (atLastStory) {
      console.log("==========At====The=====End======== LASTSTORY was TRUE");
    } else {
      if (storiesLeft >= 2) {
        console.log(
          "there are " + storiesLeft + " stories left in allStories array"
        );

        // shift active stories up by two and animate change
        if (mode == "desktop") {
          if (activeStories[0] > activeStories[1]) {
            let nv1 = activeStories[1] + 2;
            let nv0 = nv1 - 1;

            setActiveStories([nv0, nv1]);

            //gsapSwipeAnimationReverse()
          } else {
            let nv0 = activeStories[0] + 2;
            let nv1 = activeStories[1] + 2;

            setActiveStories([nv0, nv1]);

            //gsapSwipeAnimationReverse()
          }
        } else if (mode == "cellphone") {
          console.log("storiesLeft >= 2 and mode cellphone");
          if (activeStories[0] > activeStories[1]) {
            console.log("activeStories[0] was > activeStories[1]");
            let nv1 = activeStories[1] + 1;
            let nv0 = nv1 - 1;

            setActiveStories([nv0, nv1]);

            //gsapSwipeAnimationReverse()
          } else {
            let nv0 = activeStories[0] + 1;
            let nv1 = activeStories[1] + 1;

            setActiveStories([nv0, nv1]);

            //gsapSwipeAnimationReverse()
          }
        }
      } else if (storiesLeft == 1) {
        console.log(
          "there is " +
            storiesLeft +
            " story left in allStories array, fetching 1 more"
        );
        if (mode == "desktop") {
          setLoadingStories(true);
          // axios
          // 	.post(
          // 		"/reverse/",
          // 		{
          // 			data: {
          // 				secondToLastStory_ID: (props.allStories[activeStories[1]] + 1).id,
          // 				getNumOfStories: 1,
          // 			},
          // 		},
          // 		{ withCredentials: true }
          // 	)
          // 	.then((response) => {
          // 		console.log(
          // 			"============ fetch response, asked for 1 and got " +
          // 				response.data.stories.length +
          // 				" back."
          // 		)

          // 		if (response.data.stories.length == 1) {
          // 			props.setAllStories((prevStories) => [...prevStories, ...response.data.stories])

          // 			let nv0 = activeStories[0] + 2
          // 			let nv1 = activeStories[1] + 2

          // 			setActiveStories([nv0, nv1])
          // 			gsapSwipeAnimationReverse()

          // 			setLoadingStories(false)
          // 		} else if (response.data.stories.length == 0) {
          // 			////////to loop n shit
          // 			// let nv0 = activeStories[0] + 2
          // 			// let nv1 = 0

          // 			// setActiveStories([nv0, nv1])
          // 			// gsapSwipeAnimationReverse()

          // 			// setLoadingStories(false)

          // 			let nv0 = activeStories[0] + 1
          // 			let nv1 = nv0 + 1

          // 			setActiveStories([nv0, nv1])
          // 			gsapSwipeAnimationReverse()

          // 			setLoadingStories(false)
          // 		}
          // 	})
          // 	.catch((error) => {
          // 		console.log("handleReversePageErrors", error)
          // 	})
        } else if (mode == "cellphone") {
          console.log("storiesLeft == 1 and mode cellphone");

          let nv0 = activeStories[0] + 1;
          let nv1 = activeStories[1] + 1;

          setActiveStories([nv0, nv1]);
          //gsapSwipeAnimationReverse()
        }
      } else if (storiesLeft == 0) {
        console.log(
          "there are " +
            storiesLeft +
            " stories left in allStories array, fetching 2 more"
        );
        if (mode == "desktop") {
          setLoadingStories(true);
          // axios
          // 	.post(
          // 		"/reverse/",
          // 		{
          // 			data: {
          // 				secondToLastStory_ID: props.allStories[activeStories[1]].id,
          // 				getNumOfStories: 2,
          // 			},
          // 		},
          // 		{ withCredentials: true }
          // 	)
          // 	.then((response) => {
          // 		console.log(
          // 			"============ fetch response, asked for 2 and got " +
          // 				response.data.stories.length +
          // 				" back."
          // 		)

          // 		if (response.data.stories.length == 1) {
          // 			props.setAllStories((prevStories) => [...prevStories, ...response.data.stories])

          // 			let nv0 = activeStories[0] + 2
          // 			let nv1 = 0

          // 			setActiveStories([nv0, nv1])
          // 			gsapSwipeAnimationReverse()

          // 			setLoadingStories(false)
          // 		} else if (response.data.stories.length == 0) {
          // 			// let nv0 = 0
          // 			// let nv1 = 1
          // 			// setActiveStories([nv0, nv1])
          // 			// gsapSwipeAnimationReverse()
          // 			setLoadingStories(false)
          // 		} else if (response.data.stories.length == 2) {
          // 			props.setAllStories((prevStories) => [...prevStories, ...response.data.stories])
          // 			let nv0 = activeStories[0] + 2
          // 			let nv1 = activeStories[1] + 2

          // 			setActiveStories([nv0, nv1])
          // 			gsapSwipeAnimationReverse()

          // 			setLoadingStories(false)
          // 		}
          // 	})
          // 	.catch((error) => {
          // 		console.log("handleReversePageErrors", error)
          // 	})
        } else if (mode == "cellphone") {
          console.log("333333333333333333333333333333");

          setLoadingStories(true);
          // axios
          // 	.post(
          // 		"/reverse/",
          // 		{
          // 			data: {
          // 				secondToLastStory_ID: props.allStories[activeStories[1]].id,
          // 				getNumOfStories: 2,
          // 			},
          // 		},
          // 		{ withCredentials: true }
          // 	)
          // 	.then((response) => {
          // 		console.log(
          // 			"============ fetch response, asked for 2 and got " +
          // 				response.data.stories.length +
          // 				" back."
          // 		)

          // 		if (response.data.stories.length == 1) {
          // 			props.setAllStories((prevStories) => [...prevStories, ...response.data.stories])

          // 			let nv0 = activeStories[0] + 1
          // 			let nv1 = activeStories[1] + 1

          // 			setActiveStories([nv0, nv1])
          // 			gsapSwipeAnimationReverse()

          // 			setLoadingStories(false)
          // 		} else if (response.data.stories.length == 0) {
          // 			console.log("---------------     everything was zero     -----------")

          // 			let nv0 = activeStories[0] + 1
          // 			let nv1 = 0

          // 			setActiveStories([nv0, nv1])
          // 			gsapSwipeAnimationReverse()

          // 			setLoadingStories(false)
          // 		} else if (response.data.stories.length == 2) {
          // 			props.setAllStories((prevStories) => [...prevStories, ...response.data.stories])
          // 			let nv0 = activeStories[0] + 1
          // 			let nv1 = activeStories[1] + 1

          // 			setActiveStories([nv0, nv1])
          // 			gsapSwipeAnimationReverse()

          // 			setLoadingStories(false)
          // 		}
          // 	})
          // 	.catch((error) => {
          // 		console.log("handleReversePageErrors", error)
          // 	})
        }
      }
    }
  }

  function forwardStoryLogic(mode: any, direction: any) {
    console.log("forwardStoryLogic <==");
    if (mode == "desktop") {
      if (activeStories[0] == 1) {
        let nv0 = activeStories[0] - 1;
        let nv1 = activeStories[1] - 1;
        setActiveStories([nv0, nv1]);
      } else {
        let nv0 = activeStories[0] - 2;
        let nv1 = activeStories[1] - 2;
        setActiveStories([nv0, nv1]);
      }

      //gsapSwipeAnimation()
    } else if (mode == "cellphone") {
      console.log("storiesLeft >= 2 and mode cellphone");
      if (activeStories[0] > 0) {
        console.log("activeStories[0] was > zero>");
        let nv0 = activeStories[0] - 1;
        let nv1 = nv0 + 1;

        setActiveStories([nv0, nv1]);

        //gsapSwipeAnimation()
      } else {
        console.log("no more stories going forward");
      }
    }
  }

  function handleForwardPage(mode: any) {
    if (leftArrowRef.current && !leftArrowRef.current.disabled) {
      leftArrowRef.current.disabled = true;
      // Perform the action
      // After the action is complete, reset buttonRef.current.disabled to false

      // mode is either "cellphone" or "desktop"
      // sets the useRef with mode "desktop" or "cellphone"
      // so it can be accessed in the useEffect thats run after setActiveDot
      whatDirection.current = "forward";
      whatMode.current = mode;

      console.log(
        "Entering HandleForward, MODE is " +
          mode +
          " and direction is " +
          whatDirection.current
      );

      if (mode == "desktop") {
        if (activeDot > 1) {
          setActiveDot((pre) => {
            return pre - 2;
          });
        } else if (activeDot == 1) {
          setActiveDot((pre) => {
            return pre - 1;
          });
        } else if (activeDot == 0) {
          console.log("ActiveDot was zero do nada");
        }
      } else if (mode == "cellphone") {
        if (activeDot > 0) {
          console.log("Decreasing activeDot by 1");
          setActiveDot((pre) => {
            return pre - 1;
          });
        } else {
          console.log(
            "did nothing because activeDot was already at zero " + activeDot
          );
        }
      }

      leftArrowRef.current.disabled = false;
    }
  }

  function handleReversePage(mode: any) {
    if (rightArrowRef.current && !rightArrowRef.current.disabled) {
      rightArrowRef.current.disabled = true;
      // Perform the action
      // After the action is complete, reset buttonRef.current.disabled to false

      // mode is either "cellphone" or "desktop"
      // sets the useRef with mode "desktop" or "cellphone"
      // so it can be accessed in the useEffect thats run after setActiveDot
      // mode is either "cellphone" or "desktop"
      // sets the useRef with mode "desktop" or "cellphone"
      // so it can be accessed in the useEffect thats run after setActiveDot
      whatDirection.current = "reverse";
      whatMode.current = mode;

      console.log(
        "Entering HandleReverse, MODE is " +
          mode +
          " and direction is " +
          whatDirection.current
      );
      if (mode == "desktop") {
        //get stories left, if 1, then shift one only
        let dotsLeft = props.allStories.length - (activeStories[1] + 1);
        console.log("DOts left = " + dotsLeft);
        if (dotsLeft >= 2) {
          if (activeDot + 1 == props.allStories.length) {
            console.log(
              "did nothing because activeDot was same as allstories.length" +
                activeDot +
                " == " +
                props.allStories.length
            );
          } else {
            console.log("Increasing activeDot by 2");
            setActiveDot((pre) => {
              return pre + 2;
            });
          }
        } else if (dotsLeft == 1) {
          console.log("Increasing activeDot by 1");
          setActiveDot((pre) => {
            return pre + 1;
          });
        } else if (dotsLeft == 0) {
          console.log(
            "desktop reverse mode get more stories testing=================="
          );

          setLoadingStories(true);
          // axios
          // 	.post(
          // 		"/reverse/",
          // 		{
          // 			data: {
          // 				secondToLastStory_ID: props.allStories[activeStories[1]].id,
          // 				getNumOfStories: 2,
          // 			},
          // 		},
          // 		{ withCredentials: true }
          // 	)
          // 	.then((response) => {
          // 		console.log(
          // 			"+============ fetch response, asked for 2 and got " +
          // 				response.data.stories.length +
          // 				" back."
          // 		)

          // 		if (response.data.stories.length == 1) {
          // 			props.setAllStories((prevStories) => [...prevStories, ...response.data.stories])

          // 			let nv0 = activeStories[0] + 1
          // 			let nv1 = activeStories[1] + 1

          // 			setActiveStories([nv0, nv1])
          // 			gsapSwipeAnimationReverse()

          // 			setLoadingStories(false)

          // 			// setVisibleDots((pre) => {
          // 			//   let newArray = [];

          // 			//   pre.map((n, i) => {
          // 			//     newArray[i] = n + 1;
          // 			//   });

          // 			//   return newArray;
          // 			// });

          // 			setActiveDot((pre) => {
          // 				return pre + 1
          // 			})
          // 		} else if (response.data.stories.length == 0) {
          // 			// let nv0 = 0
          // 			// let nv1 = 1
          // 			// setActiveStories([nv0, nv1])
          // 			// gsapSwipeAnimationReverse()
          // 			setLoadingStories(false)
          // 		} else if (response.data.stories.length == 2) {
          // 			props.setAllStories((prevStories) => [...prevStories, ...response.data.stories])

          // 			//   setActiveStories((pre) => {
          // 			//     let newArray = [];
          // 			//     pre.map((n, i) => {
          // 			//       newArray[i] = n + 2;
          // 			//     });

          // 			//     return newArray;
          // 			//   });
          // 			gsapSwipeAnimationReverse()

          // 			setLoadingStories(false)

          // 			setVisibleDots((pre) => {
          // 				let newArray = []

          // 				pre.map((n, i) => {
          // 					newArray[i] = n + 2
          // 				})

          // 				return newArray
          // 			})

          // 			setActiveDot((pre) => {
          // 				return pre + 2
          // 			})
          // 		} else if (response.data.stories.length == 3) {
          // 			console.log("RESPNSE was 3===========================")
          // 			props.setAllStories((prevStories) => [...prevStories, ...response.data.stories])

          // 			gsapSwipeAnimationReverse()

          // 			setLoadingStories(false)

          // 			setVisibleDots((pre) => {
          // 				let newArray = []

          // 				pre.map((n, i) => {
          // 					newArray[i] = n + 2
          // 				})

          // 				return newArray
          // 			})

          // 			setActiveDot((pre) => {
          // 				return pre + 2
          // 			})
          // 		}
          // 	})
          // 	.catch((error) => {
          // 		console.log("handleReversePageErrors", error)
          // 	})
        }
      } else if (mode == "cellphone") {
        if (activeDot + 1 == props.allStories.length) {
          console.log(
            "did nothing because activeDot was same as allstories.length" +
              activeDot +
              " == " +
              props.allStories.length
          );
        } else {
          console.log("Increasing activeDot by 1");
          setActiveDot((pre) => {
            return pre + 1;
          });
        }
      }
      rightArrowRef.current.disabled = false;
    }
  }

  const getDotClassName = useCallback(
    (index: any) => {
      //console.log("======Running getDotClassName usecallback inside home function=======")

      if (whatDirection.current == "reverse" || whatDirection.current == "") {
        if (index + 3 == visibleDots[2] || index + 3 == visibleDots[8]) {
          return "medium";
        } else if (index + 3 == visibleDots[1] || index + 3 == visibleDots[9]) {
          return "small";
        } else if (
          index + 3 == visibleDots[0] ||
          index + 3 == visibleDots[10]
        ) {
          return "invisible";
        } else if (index + 3 >= visibleDots[3] && index + 3 <= visibleDots[7]) {
          return "";
        } else {
          return "invisible";
        }
      } else if (whatDirection.current == "forward") {
        if (index + 3 == visibleDots[2] || index + 3 == visibleDots[8]) {
          return "medium";
        } else if (index + 3 == visibleDots[1] || index + 3 == visibleDots[9]) {
          return "small";
        } else if (
          index + 3 == visibleDots[0] ||
          index + 3 == visibleDots[10]
        ) {
          return "invisible";
        } else if (index + 3 >= visibleDots[3] && index + 3 <= visibleDots[7]) {
          return "";
        } else {
          return "invisible";
        }
      }
    },
    [visibleDots]
  );

  const getDotStyle = () => {
    console.log(
      "======Running getDotsStyle usecallback inside home function======= " +
        transitionX
    );

    let style = {
      height: "10px",
      width: "10px",
      transform: `translateX(${transitionX}px)`,
    };

    return style;
  };

  const getAllDotsWrapperStyle = () => {
    let style = {
      gridTemplateColumns: `repeat(${props.totalNumOfStoriesOnServer}, 20px)`,
    };

    return style;
  };

  const getBackgroundBarStyles = () => {
    let style = {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      // backgroundColor: whatModeAuto == "desktop" ? "#c4c4c4" : "white",
      padding: "25px 0",
      marginTop: "40px",
    };

    return style;
  };

  const desktopIndicatorDots = Array.from(
    { length: props.allStories.length },
    (_, i) => {
      return (
        <div style={getDotStyle()} className="dot-holder" key={i}>
          <div
            key={`${i}-inner`}
            className={`eachDot
                        ${getDotClassName(i)}
                        ${
                          activeDot === i || activeDot + 1 === i ? "active" : ""
                        }`}
          />
        </div>
      );
    }
  );

  const cellphoneIndicatorDots = Array.from(
    { length: props.allStories.length },
    (_, i) => {
      return (
        <div style={getDotStyle()} className={"dot-holder"} key={i}>
          <div
            key={`${i}-inner`}
            className={`eachDot
                            ${getDotClassName(i)}
                            ${activeDot === i ? "active" : ""}`}
          />
        </div>
      );
    }
  );

  const onMouseEnter = () => {
    setIsHovering("true");
  };

  const onMouseLeave = () => {
    setIsHovering("false");
  };

  return (
    // <div
    //   className={`${
    //     showOffer ? "hidden" : "block"
    //   } overflow-hidden leading-[1.3] min-w-275px`}
    // >
    //   <div
    //     onMouseEnter={onMouseEnter}
    //     onMouseLeave={onMouseLeave}
    //     //className={"box"}
    //     className={`hidden bp480:grid mx-[1%] mt-0 mb-0 bp520:mt-[30px] grid-cols-[1fr_2%_1fr] grid-areas-home justify_center relative min-h-full`}
    //   >
    //     <button
    //       ref={leftArrowRef}
    //       //is_hovering={isHovering}
    //       onClick={debounce(() => handleForwardPage("desktop"), 300)}
    //       className={`cursor-pointer bg-stone-400/50 hover:bg-stone-400 w-[6%] h-[33.33%] border-none grid grid-in-[one] justify-start self-center z-[2]`}
    //       //props.is_hovering == "true" ? "rgba(247, 247, 247, 0.6)" : "rgba(247, 247, 247, 0.27)"};
    //     >
    //       <Image
    //         width={39}
    //         height={39}
    //         src={scrollArrow.src}
    //         alt="Scroll page back to view more articles"
    //         className={`w-full relative justify-self-center self-center -scale-x-[1]`}
    //       ></Image>
    //     </button>
    //     <Link
    //       href={{
    //         pathname: `/blog/${
    //           props.allStories[activeStories[0]]
    //             ? props.allStories[activeStories[0]].slug
    //             : "nada"
    //         }`,
    //         query: { art: props.allStories[activeStories[0]] },
    //       }}
    //       //style={{ gridArea: "1/1/-1/-1" }}
    //       className={`w-full justify-self-center grid bp481:grid-in-[one] rounded-[10px]`}
    //     >
    //       <Image
    //         //className="s1"

    //         src={
    //           props.allStories[activeStories[0]]
    //             ? props.allStories[activeStories[0]].urls[0]
    //             : defaultImage
    //         }
    //         //layout="fill"
    //         //objectFit="contain"
    //         //fill={true}
    //         width={500}
    //         height={420}
    //         alt={
    //           props.allStories[activeStories[0]]
    //             ? props.allStories[activeStories[0]].alt
    //             : ""
    //         }
    //         className={`relative rounded-[10px] w-full z-[-1]`}
    //         style={{ boxShadow: "0 2px 5px 0 rgba(227, 181, 90, 0.2)" }}
    //       ></Image>
    //     </Link>
    //     <div
    //       //className="s2"
    //       style={{
    //         //gridArea: "1/1/-1/-1",

    //         background:
    //           "linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(255, 145, 145, 0) 60%)",
    //         filter:
    //           "progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000',endColorstr='#ff9191',GradientType=1)",
    //       }}
    //       className={`bp481:grid-in-[one] whitespace-nowrap grid pointer-events-none break-all rounded-[10px] overflow-hidden w-full justify-self-center leading-[1.2]`}
    //     >
    //       <h2
    //         className={`whitespace-pre-wrap break-words text-white px-[13px] pt-0 pb-[8px] w-full self-end text-[2rem] bp480:text-[1rem] bp700:text-[1.5rem] bp1000:text-[2rem] text-center justify-self-center`}
    //       >
    //         {props.allStories[activeStories[0]]
    //           ? props.allStories[activeStories[0]].title
    //           : "Ooops! this article is not available at this time."}
    //       </h2>
    //     </div>

    //     {loadingStories ? (
    //       <div
    //         className="loader"
    //         style={{
    //           gridArea: "one",
    //           justifySelf: "center",
    //           alignSelf: "center",
    //         }}
    //       >
    //         Loading...
    //       </div>
    //     ) : null}
    //     <button
    //       //is_hovering={isHovering}
    //       onClick={debounce(() => handleReversePage("desktop"), 300)}
    //       className={`cursor-pointer bg-stone-400/50 hover:bg-stone-400 self-center justify-self-end cursor-pointer w-[6%] h-[33.33%] border-none grid grid-in-[two] z-[2]`}
    //       // background: ${(props) => props.is_hovering == "true" ? "rgba(247, 247, 247, 0.6)" : "rgba(247, 247, 247, 0.27)"};
    //     >
    //       <Image
    //         width={39}
    //         height={39}
    //         ref={rightArrowRef}
    //         src={scrollArrow.src}
    //         alt="Scroll page forward to view more articles"
    //         className="relative justify-self-end self-center"
    //       ></Image>
    //     </button>
    //     <Link
    //       href={{
    //         pathname: `/blog/${
    //           props.allStories[activeStories[1]]
    //             ? props.allStories[activeStories[1]].slug
    //             : "nada"
    //         }`,
    //         query: { art: props.allStories[activeStories[1]] },
    //       }}
    //       //style={{ gridArea: "1/1/-1/-1" }}
    //       className={`w-full self-center grid bp481:grid-in-[two] rounded-[10px]`}
    //     >
    //       <Image
    //         //className="s1"

    //         src={
    //           props.allStories[activeStories[1]]
    //             ? props.allStories[activeStories[1]].urls[0]
    //             : defaultImage
    //         }
    //         //layout="fill"
    //         //objectFit="contain"
    //         //fill={true}
    //         width={500}
    //         height={420}
    //         alt={
    //           props.allStories[activeStories[1]]
    //             ? props.allStories[activeStories[1]].alt
    //             : ""
    //         }
    //         className="relative rounded=[10px] w-full z-[-1] rounded-[10px]"
    //         //style={{ boxShadow: "0 1px 4px 0 rgba(12, 12, 13, 0.1)" }}
    //       ></Image>
    //     </Link>
    //     <div
    //       //className="s2">
    //       style={{
    //         //gridArea: "1/1/-1/-1",

    //         background:
    //           "linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(255, 145, 145, 0) 60%)",
    //         filter:
    //           "progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000',endColorstr='#ff9191',GradientType=1)",
    //       }}
    //       className={`bp481:grid-in-[two] whitespace-nowrap grid pointer-events-none break-all rounded-[10px] overflow-hidden w-full justify-self-center leading-[1.2]`}
    //     >
    //       <h2
    //         className={`whitespace-pre-wrap break-words text-white px-[13px] pt-0 pb-[8px] w-full self-end text-[2rem] bp480:text-[1rem] bp700:text-[1.5rem] bp1000:text-[2rem] text-center justify-self-center`}
    //       >
    //         {props.allStories[activeStories[1]]
    //           ? props.allStories[activeStories[1]].title
    //           : "Ooops! this article is not available at this time."}
    //       </h2>
    //     </div>

    //     {/* <BackgroundGray></BackgroundGray> */}
    //   </div>

    //   <Carousel
    //     show_offer={props.show_offer}
    //     handleReversePage={handleReversePage}
    //     handleForwardPage={handleForwardPage}
    //   >
    //     <CarouselItem>
    //       <ItemWrapper>
    //         <Link
    //           href={{
    //             pathname: `/blog/${
    //               props.allStories[activeStories[0]]
    //                 ? props.allStories[activeStories[0]].slug
    //                 : "nada"
    //             }`,
    //             query: { art: props.allStories[activeStories[0]] },
    //           }}
    //           style={{ gridArea: "1/1/-1/-1" }}
    //           className={`w-full justify-self-center grid grid-in-[one]`}
    //           //ref={gsapContainer1}
    //         >
    //           <Image
    //             src={
    //               props.allStories[activeStories[0]]
    //                 ? props.allStories[activeStories[0]].urls[0]
    //                 : defaultImage
    //             }
    //             //layout="fill"
    //             //objectFit="contain"
    //             //fill={true}
    //             width={468}
    //             height={319}
    //             alt={
    //               props.allStories[activeStories[0]]
    //                 ? props.allStories[activeStories[0]].alt
    //                 : ""
    //             }
    //             className={`relative rounded-[10px] w-full z-[-1]`}
    //             style={{ boxShadow: "0 2px 5px 0 rgba(227, 181, 90, 0.2)" }}
    //           ></Image>
    //         </Link>

    //         <div
    //           //ref={gsapContainer2}
    //           //className="s2"
    //           style={{
    //             gridArea: "1/1/-1/-1",

    //             background:
    //               "linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(255, 145, 145, 0) 60%)",
    //             filter:
    //               "progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000',endColorstr='#ff9191',GradientType=1)",
    //           }}
    //           className={`bp481:grid-in-[one] whitespace-nowrap grid pointer-events-none break-all rounded-[10px] overflow-hidden w-full justify-self-center leading-[1.2]`}
    //         >
    //           <h2
    //             className={`whitespace-pre-wrap break-words text-white px-[13px] pt-0 pb-[8px] w-full self-end text-[2rem] bp480:text-[1rem] bp700:text-[1.5rem] bp1000:text-[2rem] text-center justify-self-center`}
    //           >
    //             {props.allStories[activeStories[0]]
    //               ? props.allStories[activeStories[0]].title
    //               : "Ooops! this article is not available at this time."}
    //           </h2>
    //         </div>
    //       </ItemWrapper>
    //     </CarouselItem>
    //     <CarouselItem>
    //       <ItemWrapper>
    //         <Link
    //           href={{
    //             pathname: `/blog/${
    //               props.allStories[activeStories[1]]
    //                 ? props.allStories[activeStories[1]].slug
    //                 : "nada"
    //             }`,
    //             query: { art: props.allStories[activeStories[1]] },
    //           }}
    //           className={`w-full self-center grid bp480:grid-in-[two]`}
    //           //style={{ gridArea: "1/1/-1/-1" }}
    //         >
    //           <Image
    //             //className="s1"

    //             src={
    //               props.allStories[activeStories[1]]
    //                 ? props.allStories[activeStories[1]].urls[0]
    //                 : defaultImage
    //             }
    //             //layout="fill"
    //             //objectFit="contain"
    //             width={200}
    //             height={200}
    //             alt={
    //               props.allStories[activeStories[1]]
    //                 ? props.allStories[activeStories[1]].alt
    //                 : ""
    //             }
    //             className="relative rounded=[10px] w-full"
    //             style={{ boxShadow: "0 1px 4px 0 rgba(12, 12, 13, 0.1)" }}
    //           ></Image>
    //         </Link>

    //         <div
    //           //className="s2"
    //           style={{
    //             //gridArea: "1/1/-1/-1",

    //             background:
    //               "linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(255, 145, 145, 0) 60%)",
    //             filter:
    //               "progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000',endColorstr='#ff9191',GradientType=1)",
    //           }}
    //           className={`bp481:grid-in-[two] whitespace-nowrap grid pointer-events-none break-all rounded-[10px] overflow-hidden w-full justify-self-center leading-[1.2]`}
    //         >
    //           <h2
    //             className={`whitespace-pre-wrap break-words text-white px-[13px] pt-0 pb-[8px] w-full self-end text-[2rem] bp480:text-[1rem] bp700:text-[1.5rem] bp1000:text-[2rem] text-center justify-self-center`}
    //           >
    //             {props.allStories[activeStories[1]]
    //               ? props.allStories[activeStories[1]].title
    //               : "Ooops! this article is not available at this time."}
    //           </h2>
    //         </div>
    //       </ItemWrapper>
    //     </CarouselItem>
    //   </Carousel>

    //   <div style={getBackgroundBarStyles()}>
    //     <div className="allDotsWrapper" style={getAllDotsWrapperStyle()}>
    //       {whatModeAuto == "desktop"
    //         ? desktopIndicatorDots
    //         : cellphoneIndicatorDots}
    //     </div>
    //   </div>
    // </div>
    <div className="">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        className=""
        containerClass="container"
        dotListClass="myDots"
        //draggable
        focusOnSelect={false}
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={true}
        renderButtonGroupOutside={true}
        renderDotsOutside={true}
        ////////
        swipeable={false}
        partialVisible
        //partialVisible={false}
        //centerMode
        //draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        //infinite={true}
        //autoPlay={props.deviceType !== "mobile" ? false : false}
        //autoPlaySpeed={1000}

        //customTransition="all .9"
        //transitionDuration={500}
        //containerClass="carousel-container"
        //removeArrowOnDeviceType={["tablet", "mobile"]}
        //deviceType={props.deviceType}
        //dotListClass="custom-dot-list-style"
        //itemClass="carousel-item-padding-40-px"
        itemClass="itemClass"
      >
        {props.allStories.map((story: any, i: any) => {
          return (
            <div key={i} className="my-0 mx-auto grid grid-cols-[1fr]">
              <Link
                href={{
                  pathname: `/blog/${story.slug}`,
                  //query: { art: props.allStories[activeStories[0]] },
                }}
                //style={{ gridArea: "1/1/-1/-1" }}
                className={`w-full justify-self-center grid-in-main`}
                //ref={gsapContainer1}
              >
                <Image
                  src={story.urls[0]}
                  //layout="fill"
                  //objectFit="contain"
                  //fill={true}
                  width={468}
                  height={319}
                  alt={story.alt}
                  className={`relative rounded-[10px] w-full z-[-1] grid-in-main`}
                  style={{ boxShadow: "0 2px 5px 0 rgba(227, 181, 90, 0.2)" }}
                ></Image>
              </Link>

              <div
                //ref={gsapContainer2}
                //className="s2"
                style={{
                  //gridArea: "1/1/-1/-1",

                  background:
                    "linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, rgba(255, 145, 145, 0) 60%)",
                  filter:
                    "progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000',endColorstr='#ff9191',GradientType=1)",
                }}
                className={`bp481:grid-in-[one] whitespace-nowrap grid pointer-events-none break-all rounded-[10px] overflow-hidden w-full justify-self-center leading-[1.2] grid-in-main`}
              >
                <h2
                  className={`whitespace-pre-wrap break-words text-white px-[13px] pt-0 pb-[8px] w-full self-end text-[2rem] bp480:text-[1rem] bp700:text-[1.5rem] bp1000:text-[2rem] text-center justify-self-center`}
                >
                  {story.title}
                </h2>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
