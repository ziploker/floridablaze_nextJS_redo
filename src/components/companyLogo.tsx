"use client";
import Image from "next/image";

import company_logo from "@/images/company_logo.svg";
import tag_line from "@/images/tagline2.svg";

export default function CompanyLogo() {
  return (
    <div className="grid grid-cols-1 gap-[10px] w-[171px] ml-[15px] mb-[8px] justify-self-start self-center cl_bp_295:w-[200px] cl_bp_295:top-[4px] cl_bp_295:ml-[20px] cl_bp_520:w-[265px] cl_bp_731:w-[300px] cl_bp_985:ml-[50px] cl_bp_985:w-[300px] absolute top-4px z-51 cursor-pointer ease-linear duration-[.3s]">
      <Image
        className="justify-self-start w-[95%] -ml-[2px] cl_bp_295:ml-[initial]"
        src={company_logo}
        alt="floridablaze home"
        width={300}
      />
      <Image
        className="justify-self-start self-center w-250"
        src={tag_line}
        alt=""
        width={300}
      />
    </div>
  );
}
