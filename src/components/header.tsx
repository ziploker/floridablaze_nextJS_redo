import Image from "next/image";

import leaf from "@/images/headerLeafv2.png";
import CompanyLogo from "@/components/companyLogo";
export default function Header() {
  return (
    <div className="relative grid place-items-stretch grid-cols-[minmax(180px,280px)1fr] grid-rows-[69px] mt-[15px]">
      <CompanyLogo />
      <Image
        className="hidden leaf_bp_520px:block w-full h-full max-w-[420px] min-w-[250px] justify-self-end self-center"
        src={leaf}
        alt=""
      />
    </div>
  );
}
