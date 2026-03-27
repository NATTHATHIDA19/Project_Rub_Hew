"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type FilterType = "all" | "carry" | "request";

type FilterChipsAndAddProps = {
  activeChip: FilterType;
  onChipChange: (filter: FilterType) => void;
};

export default function FilterChipsAndAdd({
  activeChip,
  onChipChange,
}: FilterChipsAndAddProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseClass =
    "rounded-full px-7 py-2 text-sm font-thainohead text-black shadow-xs shadow-black transition";
  const inactiveClass = "bg-[#D7C39D]";
  const activeClass = {
    all: "bg-[#2F4363] text-white",
    carry: "bg-[#85CCC7] text-black",
    request: "bg-[#EE7F47] text-black",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const openCreateMenu = () => {
    const token = window.localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
      return;
    }

    setIsMenuOpen((current) => !current);
  };

  return (
    <div className="flex items-start justify-between px-6 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onChipChange("all")}
          className={`${baseClass} ${
            activeChip === "all" ? activeClass.all : inactiveClass
          }`}
        >
          ทั้งหมด
        </button>

        <button
          type="button"
          onClick={() => onChipChange("carry")}
          className={`${baseClass} ${
            activeChip === "carry" ? activeClass.carry : inactiveClass
          }`}
        >
          รับหิ้ว
        </button>

        <button
          type="button"
          onClick={() => onChipChange("request")}
          className={`${baseClass} ${
            activeChip === "request" ? activeClass.request : inactiveClass
          }`}
        >
          ฝากหิ้ว
        </button>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={openCreateMenu}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#CBBCA4] text-4xl text-black shadow-md shadow-black transition hover:scale-105"
          aria-label="สร้างโพสต์ใหม่"
        >
          +
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-16 z-20 w-52 overflow-hidden rounded-2xl border border-[#CBBCA4] bg-[#FFF8EC] shadow-lg">
            <Link
              href="/posts/new?type=carry"
              className="block px-4 py-3 font-thainohead text-black transition hover:bg-[#E7F6F4]"
              onClick={() => setIsMenuOpen(false)}
            >
              สร้างโพสต์รับหิ้ว
            </Link>
            <Link
              href="/posts/new?type=request"
              className="block px-4 py-3 font-thainohead text-black transition hover:bg-[#FFF0E8]"
              onClick={() => setIsMenuOpen(false)}
            >
              สร้างโพสต์ฝากหิ้ว
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
