import Image from "next/image";
import logo from "public/stackline_logo.svg";

export function NavBar() {
  return (
    <nav className="sticky top-0 z-10 flex h-20 w-full items-center bg-[#052849]">
      <div className="ml-8 flex flex-col">
        <Image src={logo} alt="Stackline Logo" height={30} />
        <div className="mt-2 h-1 w-full bg-white"></div>
      </div>
    </nav>
  );
}
