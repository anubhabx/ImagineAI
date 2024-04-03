"use client";

import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href={"/"}>
          <Image
            src="assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {sidebarLinks.slice(0, 6).map((link, index) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.label}
                    className={cn(
                      "sidebar-nav_element rounded-lg transition-all duration-150",
                      {
                        "bg-purple-gradient text-white": isActive,
                      }
                    )}
                  >
                    <Link href={link.route} className="sidebar-link">
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={20}
                        height={20}
                        className={`${
                          isActive && "brightness-200"
                        } transition-all duration-150`}
                      />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SignedIn>

          <ul className="sidebar-nav_elements">
            {sidebarLinks.slice(6).map((link, index) => {
              const isActive = link.route === pathname;

              return (
                <li
                  key={link.label}
                  className={cn(
                    "sidebar-nav_element rounded-lg transition-all duration-150",
                    {
                      "bg-purple-gradient text-white": isActive,
                    }
                  )}
                >
                  <Link href={link.route} className="sidebar-link">
                    <Image
                      src={link.icon}
                      alt={link.label}
                      width={20}
                      height={20}
                      className={`${
                        isActive && "brightness-200"
                      } transition-all duration-150`}
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
            <li className="flex-center cursor-pointer gap-2 p-4">
              <UserButton afterSignOutUrl="/" showName />
            </li>
          </ul>

          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
