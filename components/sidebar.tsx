"use client";

import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Logo from "./logo";

const Sidebar = () => {
  const currentPath = usePathname();

  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/cards", label: "Cards" },
    { path: "/products", label: "Products" },
    { path: "/colors", label: "Colors" },
    { path: "/users", label: "Users" },
    { path: "/orders", label: "Orders" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <div className="w-60 py-12 px-4 border-r bg-gray-100 flex flex-col justify-between min-h-screen">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="mb-20">
          <Logo />
        </div>

        {/* Navigation Links */}
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                className={`block py-2 px-3 rounded-md ${
                  currentPath === link.path
                    ? "text-blue-600 font-semibold bg-blue-100"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-200"
                }`}
                href={link.path}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Actions */}
      <div className="mt-10">
        <UserButton />
      </div>
    </div>
  );
};

export default Sidebar;
