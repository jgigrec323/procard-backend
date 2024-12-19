import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/sidebar";
import { ToasterProvider } from "@/providers/toast-provider";

export const metadata: Metadata = {
  title: "Procard Admin Board",
  description: "Procard Admin Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr-FR">
        <body className="flex min-h-screen bg-gray-100 text-gray-900">
          <ToasterProvider />

          {/* Sidebar */}
          <div className="h-screen flex-shrink-0">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
