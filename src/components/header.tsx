import Image from "next/image";

import leaf from "@/images/headerLeafv2.png";
import CompanyLogo from "@/components/companyLogo";
export default function Header() {
  return (
    <div className="relative grid grid-cols-[minmax(180px,280px)1fr] grid-rows-[69px] gap-[8px] mt-[15px] max-w-[2000px] overflow-hidden cl_bp_520:grid-rows-[80px]">
      <div className="w-full" />
      <CompanyLogo />
      <Image
        className="hidden leaf_bp_520px:block w-full h-full max-w-[420px] min-w-[250px] justify-self-end self-center"
        src={leaf}
        alt=""
      />
    </div>
  );
}
