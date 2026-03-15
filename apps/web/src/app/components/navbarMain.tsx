import Image from "next/image";
import LogoThin from "./logo";

export default function NavbarMain() {
    return (
        <header className="flex h-24 justify-between items-center bg-[#2F4363] px-10">
           <span><LogoThin /></span>
           
        <div className="mx-4 hidden flex-1 justify-center md:flex">
            <div className="flex w-full max-w-2xl items-center rounded-full bg-white px-6 py-3 text-black shadow">
              <span className="mr-3 text-sm">
                <Image 
                    src="/picture/humbleicons_search.png"
                    alt="Search"
                    width={30}
                    height={30}
                />
              </span>
              <input
                type="text"
                placeholder="ค้นหา"
                className="w-full bg-transparent text-lg outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 text-xl">
            <span className="cursor-pointer">
                <Image 
                    src="/picture/Save(icon).png"
                    alt="Save"
                    width={35}
                    height={35}
                />
            </span>
            <span className="cursor-pointer">
                <Image 
                    src="/picture/hugeicons_notification-01.png"
                    alt="Notification"
                    width={35}
                    height={35}
                />
            </span>
            <span className="cursor-pointer">
                <Image 
                    src="/picture/User(icon).png"
                    alt="User"
                    width={35}
                    height={35}
                />
            </span>
          </div>
        </header>
    );
}