"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { useSelectedLayoutSegments } from "next/navigation";
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
  const segments = useSelectedLayoutSegments();

  console.log("ALLSTORIES", props.allStories);
  console.log("segment", segments);

  const showOffer = false;
  //sets initial sories to local state for caching
  // useEffect(() => {
  //   // // if (
  //   // // 	window.localStorage !== null &&
  //   // // 	window.localStorage.getItem("allStories") !== null &&
  //   // // 	JSON.parse(window.localStorage.getItem("allStories") as string).length > 0 &&
  //   // // 	props.allStoriesFromController.length > 0
  //   // // ) {
  //   // // 	console.log(
  //   // // 		"compare it LOCAL=======",
  //   // // 		JSON.parse(window.localStorage.getItem("allStories") as string)[0].id
  //   // // 	)

  //   // // 	if (
  //   // // 		props.allStoriesFromController[0].id ==
  //   // // 		JSON.parse(window.localStorage.getItem("allStories") as string)[0].id
  //   // // 	) {
  //   // // 		props.setAllStories(JSON.parse(window.localStorage.getItem("allStories") as string))
  //   // // 	}

  //   // console.log(
  //   // 	"check to see whats up with localstorage",
  //   // 	typeof window.localStorage.getItem("allStories")
  //   // )
  //   //}
  //   setIsPageLoded(true);
  //   // }
  // }, []);

  // useEffect(() => {
  //   function setModeAutoUseState() {
  //     if (window.innerWidth <= 480) {
  //       setWhatModeAuto("cellphone");
  //     } else {
  //       setWhatModeAuto("desktop");
  //     }
  //   }

  //   if (window.innerWidth <= 480) {
  //     setWhatModeAuto("cellphone");
  //   } else {
  //     setWhatModeAuto("desktop");
  //   }

  //   window.addEventListener("resize", setModeAutoUseState);

  //   //return () => window.removeEventListener("resize", setModeAutoUseState)
  // }, []);

  // //
  // //
  // //sets props.allStories to local state for caching every time new stories are scrolled
  // useEffect(() => {
  //   function toObject(stuff: any) {
  //     return JSON.parse(
  //       JSON.stringify(
  //         stuff,
  //         (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  //       )
  //     );
  //   }

  //   if (window.localStorage !== null) {
  //     window.localStorage.setItem("allStories", toObject(props.allStories));
  //   }
  // }, [props.allStories]);

  // //
  // //
  // //shifts the indicator dots to the left everytime visibleDots changes
  // useEffect(() => {
  //   console.log(
  //     "inUSeEffEct for visibledots, whatDirection.current is " +
  //       whatDirection.current
  //   );
  //   if (isMountedForVisibleDotsUseEffect.current) {
  //     if (whatMode.current == "cellphone") {
  //       if (whatDirection.current == "reverse") {
  //         if (visibleDots[7] - 3 == props.allStories.length) {
  //           console.log("AT the ned of the line");
  //         } else {
  //           console.log(
  //             "settttttttttttttttttttttttttttttttttting TTTTTTTTTTTT"
  //           );
  //           setTransitionX((pre) => pre - 20);
  //         }
  //       } else if (whatDirection.current == "forward") {
  //         //doesnt happen here unless clickhandler logis says so
  //         setTransitionX((pre) => pre + 20);
  //       }
  //     } else if (whatMode.current == "desktop") {
  //       if (whatDirection.current == "reverse") {
  //         //   if (visibleDots[7] - 3 == props.allStories.length) {
  //         //     console.log("AT the ned of the line");
  //         //   } else {
  //         setTransitionX((pre) => pre - 40);
  //         //}
  //       } else if (whatDirection.current == "forward") {
  //         //   if (visibleDots[0] == 0) {
  //         //     console.log("AT the eNd of the line");
  //         //     setTransitionX((pre) => pre + 40);
  //         //   } else {
  //         setTransitionX((pre) => pre + 40);
  //         //}
  //       }
  //     }
  //   } else {
  //     isMountedForVisibleDotsUseEffect.current = true;
  //   }
  // }, [visibleDots]);

  // //
  // //
  // //changes Stories and activeDot position everytime activeDot changes
  // useEffect(() => {
  //   if (isMountedForactiveDotUseEffect.current) {
  //     const mode = whatMode.current;
  //     const direction = whatDirection.current;

  //     //REVERSE DOT LOGIC & STORY LOGIC
  //     if (direction == "reverse") {
  //       if (mode == "cellphone") {
  //         reverseCellphoneDotLogic();
  //       } else if (mode == "desktop") {
  //         reverseDesktopDotLogic();
  //       }

  //       reverseStoryLogic(mode, direction);

  //       //FORWARD DOT LOGIC & STORY LOGIC
  //     } else if (direction == "forward") {
  //       if (mode == "cellphone") {
  //         forwardCellphoneDotLogic();
  //       } else if (mode == "desktop") {
  //         forwardDesktopDotLogic();
  //       }

  //       forwardStoryLogic(mode, direction);
  //     }
  //   } else {
  //     isMountedForactiveDotUseEffect.current = true;
  //   }
  // }, [activeDot]);

  // useEffect(() => {
  //   if (props.goToActNow == "true") {
  //     console.log("goToActnow was true");
  //     props.executeScrollForLookupSection();
  //   } else {
  //     console.log("goToActnow was false");
  //   }
  // }, []);

  const responsive = {
    // desktop: {
    //   breakpoint: { max: 3000, min: 1024 },
    //   items: 4,
    //   slidesToSlide: 3, // optional, default to 1.
    // },
    // tablet: {
    //   breakpoint: { max: 1024, min: 484 },
    //   items: 2,
    //   slidesToSlide: 2, // optional, default to 1.
    // },
    // mobile: {
    //   breakpoint: { max: 484, min: 0 },
    //   items: 1,
    //   slidesToSlide: 1, // optional, default to 1.
    // },

    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 3,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 2,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <div className="">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        draggable
        focusOnSelect={false}
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        partialVisible
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        dotListClass="myDots"
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        itemClass="itemClass"
      >
        {props.allStories.map((story: any, i: any) => {
          return (
            <div key={i} className="my-0 mx-auto grid grid-cols-[1fr]">
              <Link
                href={{
                  pathname: `/blog/${story.slug}`,
                  query: { art: JSON.stringify(story) },
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
                  className={`whitespace-pre-wrap break-keep text-white px-[13px] pt-0 pb-[8px] w-full self-end text-[2rem] bp480:text-[1rem] bp700:text-[1.5rem] bp1000:text-[2rem] text-center justify-self-center`}
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
