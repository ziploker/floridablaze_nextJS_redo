"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

import company_logo from "@/images/company_logo.svg";
import tag_line from "@/images/tagline.svg";

interface Props {
  logoScrolled: string;
  setLogoScrolled: (word: string) => void;
}

export default function CompanyLogo(props: Props) {
  const [pixlesFromLogoToTop, setPixlesFromLogoToTop] = useState(1);
  const logoTextRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (logoTextRef.current) {
      setPixlesFromLogoToTop(
        logoTextRef.current.getBoundingClientRect().top //-30
      );
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    // window.scrollY >= pixlesFromLogoToTop - 4
    window.scrollY >= pixlesFromLogoToTop + 1
      ? props.setLogoScrolled("true")
      : props.setLogoScrolled("false");
  };

  return (
    <div
      ref={logoTextRef}
      className={`grid grid-cols-1 gap-[10px] w-[171px] ml-[15px] mb-[8px] justify-self-start self-center cl_bp_295:ml-[20px]  ${
        props.logoScrolled === "true"
          ? "fixed top-[14px] cl_bp_731:w-[260px] cl_bp_520:top-[10px] cl_bp_295:w-[160px] cl_bp_520:w-[225px] cl_bp_985:w-[260px]"
          : "absolute top-[4px] cl_bp_731:w-[300px] cl_bp_520:top-[4px] cl_bp_295:w-[200px] cl_bp_520:w-[265px] cl_bp_985:w-[300px]"
      } cl_bp_985:ml-[50px] z-51 cursor-pointer ease-linear duration-[.3s] 
      }`}
    >
      <Image
        className="justify-self-start w-[95%] -ml-[2px] cl_bp_295:ml-[initial]"
        src={company_logo}
        alt="floridablaze home"
        width={300}
      />
      <Image
        className={`justify-self-start w-[112%] ml-[1px] ease-linear duration-[.3s]   ${
          props.logoScrolled === "true"
            ? "opacity-0 max-h-[0px] max-w-[0px] scale(.1)"
            : "opacity-100 max-h-[50px] max-w-[500px] scale(1)"
        }`}
        src={tag_line}
        alt=""
        width={300}
      />
    </div>
  );
}
