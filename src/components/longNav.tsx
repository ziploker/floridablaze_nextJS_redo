"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

interface Props {
  loggedInStatus?: string;
  userState?: any;
  longNavScrolled?: string;
  setLongNavScrolled: (word: string) => void;
}

export default function LongNav(props: Props) {
  const [pixlesFromLongNavToTop, setPixlesFromLongNavToTop] = useState(1);
  const [scrollDir, setScrollDir] = useState("scrolling down");
  const longNavRef = useRef<HTMLInputElement>(null);
  const [leafScrolledSoChangeColorDown, setLeafScrolledSoChangeColorDown] =
    React.useState("false");

  const [leafScrolledSoChangeColorUp, setLeafScrolledSoChangeColorUp] =
    React.useState("false");

  useEffect(() => {
    if (longNavRef.current) {
      console.log(
        "What is the longNavRef.current.getBoundingClientRect().top",
        longNavRef.current.getBoundingClientRect().top
      );
      longNavRef.current.getBoundingClientRect().top == 0
        ? null
        : setPixlesFromLongNavToTop(
            longNavRef.current.getBoundingClientRect().top
          );
    }

    if (longNavRef.current) {
      setPixlesFromLongNavToTop(
        longNavRef.current.getBoundingClientRect().top //-30
      );
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("UseEffect 22222222222");
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    console.log(scrollDir);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  const handleScroll = () => {
    window.scrollY >= pixlesFromLongNavToTop + 25
      ? props.setLongNavScrolled("true")
      : props.setLongNavScrolled("false");

    window.scrollY >= 60
      ? setLeafScrolledSoChangeColorDown("true")
      : setLeafScrolledSoChangeColorDown("false");

    window.scrollY <= 69
      ? setLeafScrolledSoChangeColorUp("true")
      : setLeafScrolledSoChangeColorUp("false");
  };

  return (
    <nav
      ref={longNavRef}
      className={`z-40 hidden longNav_bp_600:flex grid-in-[right] justify-self-end self-center mt-0 mb-0 ml-[-25px] mr-[-25px] ${
        props.longNavScrolled === "true" ? "fixed" : "initial"
      } ${props.longNavScrolled === "true" ? "top-[2px]" : "initial"}
			${
        scrollDir === "scrolling down"
          ? leafScrolledSoChangeColorDown === "true"
            ? "text-black"
            : "text-white"
          : leafScrolledSoChangeColorUp === "true"
          ? "text-white"
          : "text-black"
      }`}
    >
      <ul className="list-none mr-[40px] grid items-baseline text-inherit self-center grid-cols-longNav">
        <li
          className="font-fira font-bold items-baseline px-[5px] py-[0px] text-[1.5rem] leading-[45px] text-inherit list-none grid cursor-pointer"
          key={0}
        >
          news
        </li>
        {/* <li key={1} onClick={props.executeScrollForLookupSection}>*/}
        <li
          className="font-fira font-bold items-baseline px-[5px] py-[0px] text-[1.5rem] leading-[45px] text-inherit list-none grid cursor-pointer"
          key={1}
        >
          act
        </li>
        <li
          className="font-fira font-bold items-baseline px-[5px] py-[0px] text-[1.5rem] leading-[45px] text-inherit list-none grid cursor-pointer"
          key={2}
        >
          shop
        </li>

        {props.userState.loggedInStatus == "LOGGED_IN"
          ? [
              <li
                className="font-fira py-0 pr-0 pl-[4px] text-[.75rem] leading-[45px]"
                key={3}
              >
                {/* <a key={"a"} onClick={props.handleLogOutClick}>*/}
                <a key={"a"}>Logout</a>
              </li>,
              <span key={4} style={{ fontSize: ".8em", padding: "0 2px" }}>
                |
              </span>,
              <li
                className="font-fira p-0 text-[.75rem] leading-[45px]"
                key={5}
              >
                <Link
                  style={{ textDecoration: "none", fontSize: ".75rem" }}
                  key={"b"}
                  href="/edit"
                >
                  edit
                </Link>
              </li>,
            ]
          : [
              <li
                className="font-fira py-0 pr-0 pl-[4px] text-[.75rem] leading-[45px]"
                key={6}
              >
                {/*<a key={"c"} onClick={doSomething}>*/}
                <a className="block leading-[45px]" key={"c"}>
                  Login
                </a>
              </li>,
              <span key={7} style={{ fontSize: ".8em", padding: "0 2px" }}>
                |
              </span>,
              <li
                className="font-fira p-0 text-[.75rem] leading-[45px]"
                key={8}
              >
                {/*<a key={"d"} onClick={props.executeScrollForSection2}>*/}
                <a className="block leading-[45px]" key={"d"}>
                  Signup
                </a>
              </li>,
            ]}
      </ul>
    </nav>
  );
}
