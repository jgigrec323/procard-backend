"use client";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => router.push("/")}
          >
            My App
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button onClick={() => router.push("/dashboard")}>
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => router.push("/settings")}>
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-200 p-6">
          <ul className="space-y-4">
            <li>
              <button onClick={() => router.push("/dashboard")}>
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => router.push("/cards")}>Cards</button>
            </li>
            <li>
              <button onClick={() => router.push("/users")}>Users</button>
            </li>
            <li>
              <button onClick={() => router.push("/orders")}>Orders</button>
            </li>
          </ul>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 px-6 text-center">
        &copy; {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
