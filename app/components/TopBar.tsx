"use client";

import React, { useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";
import SideMenu from "./SideMenu";
import Image from "next/image";

interface TopBarProps {
  title?: string;
  showLogo?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  title = "رؤیاژه",
  showLogo = true,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-[var(--secondary-bg)]/95 backdrop-blur border-b border-gray-800/70 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]/50"
          aria-label="فتح منو"
        >
          <IconMenu2 size={24} className="text-[var(--text-primary)]" />
        </button>

        <div className="flex-1 text-center">
          {showLogo ? (
            <Image
              src="/images/logo.svg"
              alt="رؤیاژه"
              width={120}
              height={28}
              className="mx-auto h-7 w-auto"
              priority
            />
          ) : (
            <h1 className="text-lg font-semibold text-[var(--text-heading)]">
              {title}
            </h1>
          )}
        </div>

        {/* Placeholder for balance - same width as menu button */}
        <div className="w-10"></div>
      </div>

      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default TopBar;
