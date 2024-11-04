"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
//import { setFlagsFromString } from "v8";
import { logout } from "../../lib";

interface Props {
  loggedInStatus?: string;
  userState: any;
  longNavScrolled: string;
  setLongNavScrolled: (word: string) => void;
  leafScrolledSoChangeColorDown: string;
  setLeafScrolledSoChangeColorDown: (word: string) => void;
  leafScrolledSoChangeColorUp: string;
  setLeafScrolledSoChangeColorUp: (word: string) => void;
  scrollDir: string;
  setScrollDir: (word: string) => void;
}

export default function LongNav(props: any) {
  const longNavRef = useRef<HTMLInputElement>(null);
  //const session = await getSession();
  //console.log("inside LongNav, cheking sesion", props.session);

  useEffect(() => {
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
      props.setScrollDir(
        scrollY > lastScrollY ? "scrolling down" : "scrolling up"
      );
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
    console.log(props.scrollDir);

    return () => window.removeEventListener("scroll", onScroll);
  }, [props.scrollDir]);

  const handleScroll = () => {
    if (longNavRef.current) {
      window.scrollY >= longNavRef.current.getBoundingClientRect().top + 25
        ? props.setLongNavScrolled("true")
        : props.setLongNavScrolled("false");
    }

    window.scrollY >= 60
      ? props.setLeafScrolledSoChangeColorDown("true")
      : props.setLeafScrolledSoChangeColorDown("false");

    window.scrollY <= 69
      ? props.setLeafScrolledSoChangeColorUp("true")
      : props.setLeafScrolledSoChangeColorUp("false");
  };

  const handleLoginMenu = () => {
    props.setOpenLoginMenu(!props.openLoginMenu);
  };

  return (
    <nav
      ref={longNavRef}
      className={`z-40 hidden longNav_bp_600:flex grid-in-[right] justify-self-end self-center mt-0 mb-0 ml-[-25px] mr-[-25px] ${
        props.longNavScrolled === "true" ? "fixed" : "initial"
      } ${props.longNavScrolled === "true" ? "top-[2px]" : "initial"}
			${
        props.scrollDir === "scrolling down"
          ? props.leafScrolledSoChangeColorDown === "true"
            ? "text-black"
            : "text-white"
          : props.leafScrolledSoChangeColorUp === "true"
          ? "text-white"
          : "text-black"
      }`}
    >
      <ul className="list-none mr-[40px] grid items-baseline text-[1rem] sm:text-[1.5rem] self-center grid-cols-longNav">
        <li
          className="font-fira font-bold items-baseline px-[5px] py-[0px] leading-[45px] text-inherit list-none grid cursor-pointer"
          key={0}
        >
          news
        </li>
        {/* <li key={1} onClick={props.executeScrollForLookupSection}>*/}
        <li
          className="font-fira font-bold items-baseline px-[5px] py-[0px] leading-[45px] text-inherit list-none grid cursor-pointer"
          key={1}
        >
          act
        </li>
        <li
          className="font-fira font-bold items-baseline px-[5px] py-[0px] leading-[45px] text-inherit list-none grid cursor-pointer"
          key={2}
        >
          shop
        </li>

        {props.session?.user
          ? [
              <li
                className="font-fira py-0 pr-0 pl-[4px] text-[.75rem] leading-[45px]"
                key={3}
              >
                {/* <a key={"a"} onClick={props.handleLogOutClick}>*/}
                <a key={"a"} onClick={() => logout()}>
                  Logout
                </a>
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
                <a
                  className="block leading-[45px]"
                  key={"c"}
                  onClick={handleLoginMenu}
                >
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
