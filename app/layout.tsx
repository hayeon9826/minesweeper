import type { Metadata } from "next";

import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import * as styles from "@/styles/common.css";

export const metadata: Metadata = {
  title: "Next Minesweeper",
  description: "Simple Minesweeper game with next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${styles.main}`}>
        <Header />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
