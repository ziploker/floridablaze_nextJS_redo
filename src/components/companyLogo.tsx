"use client";
import Image from "next/image";

import company_logo from "@/images/company_logo.svg";
import tag_line from "@/images/tagline2.svg";

export default function CompanyLogo() {
  return (
    <div>
      <Image
        className="justify-self-start self-center w-250"
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
