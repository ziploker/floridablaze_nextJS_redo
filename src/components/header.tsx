import Image from "next/image";

import company_logo from "@/images/company_logo.svg";
import leaf from "@/images/headerLeafv2.png";
import tag_line from "@/images/tagline2.svg";

export default function Header() {
  return (
    <div className="grid grid-cols-[minmax(180px,280px)1fr] grid-rows-[80px]">
      <div className="justify-self-start self-center w-250">
        <Image src={company_logo} alt="floridablaze home" width={300} />
      </div>
      <div className="max-w-[520px] min-w-[250px] justify-self-end self-center">
        <Image src={leaf} alt="" />
      </div>
    </div>
  );
}
