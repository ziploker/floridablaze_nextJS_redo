"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

export default function Hamburger() {
  const [hamburgerScrolled, setHamburgerScrolled] = React.useState("false");
  const [pixlesFromHamburgerToTop, setPixlesFromHamburgerToTop] = useState(1);
  const hamburgerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hamburgerRef.current) {
      hamburgerRef.current.getBoundingClientRect().top > 37
        ? null
        : setPixlesFromHamburgerToTop(
            hamburgerRef.current.getBoundingClientRect().top - 20
          );
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("UseEffect 5555555555555");
    // make it so this header doesnt load on certin pages

    //function to pass to mousedown listener, to close side menu if need be.
    listener = (event) => {
      //if you click in the menu,  dont close it
      if (hamburgerRef.current.contains(event.target)) {
        return;
      }

      //if you click anywhere outside the side menu, close it.
      //mouseDownHandler();
      props.set_open_side_menu("false");
    };

    //resize and/or orientationchange listener
    const handleResize = () => {
      //closed sideMenu on orientation change, if it gets bigger than 850px
      if (window.innerWidth > 500) {
        props.set_open_side_menu("false");
      }
    };

    //set up event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    document.addEventListener("mousedown", listener);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      document.removeEventListener("mousedown", listener);
      console.log("cleanup");
    };
  }, [hamburgerRef]);
  //}, [hamburgerRef, mouseDownHandler]);

  // sets the state so the element can stick
  const handleScroll = () => {
    window.scrollY >= pixlesFromHamburgerToTop + 10
      ? setHamburgerScrolled("true")
      : setHamburgerScrolled("false");
  };
  return (
    <div ref={hamburgerRef}>
      <h1>burger</h1>
    </div>
  );
}
