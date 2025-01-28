import StacklineLogo from "@/components/ui/logos/stackline-logo";

export function NavBar() {
  return (
    <nav className="sticky top-0 z-10 flex h-20 w-full items-center bg-[#052849]">
      <div className="ml-8 flex flex-col">
        <StacklineLogo className="h-[30px]" />
        <div className="mt-2 h-1 w-full bg-white"></div>
      </div>
    </nav>
  );
}
