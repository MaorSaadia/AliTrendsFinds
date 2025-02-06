"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeaderSearchBar from "@/components/layout/HeaderSearchBar";

type HeaderProps = {
  categorySelector: React.ReactNode;
};

const Header = ({ categorySelector }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledUp = currentScrollY < prevScrollY;

      setIsScrolled(currentScrollY > 0);

      if (scrolledUp) {
        setIsOpen(true);
      } else if (currentScrollY > 100) {
        setIsOpen(false);
      }

      setPrevScrollY(currentScrollY);
    };

    setPrevScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={`w-full transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`relative w-full border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
            isScrolled ? "shadow-md" : ""
          }`}
        >
          {/* Orange line decoration */}
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center gap-4 sm:gap-6">
                <button className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                  {categorySelector}
                  <Link
                    href="#"
                    className="transition-colors hover:text-orange-500"
                  >
                    Finds
                  </Link>
                </nav>
              </div>

              <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2 transform"
              >
                <span className="text-xl font-bold tracking-tight sm:text-2xl">
                  <span className="text-orange-500">Ali</span>
                  <span className="text-red-700">Trends</span>
                  <span className="text-orange-500">Finds</span>
                </span>
              </Link>

              <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
                <HeaderSearchBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
