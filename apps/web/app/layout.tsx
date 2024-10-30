import "@repo/ui/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import Gnb from "@/components/Gnb";
import { Providers } from "./providers";

const spoqaHanSansNeo = localFont({
  src: [
    { path: "./fonts/SpoqaHanSansNeo-Thin.woff", weight: "100" },
    { path: "./fonts/SpoqaHanSansNeo-Light.woff", weight: "300" },
    { path: "./fonts/SpoqaHanSansNeo-Regular.woff", weight: "400" },
    { path: "./fonts/SpoqaHanSansNeo-Medium.woff", weight: "500" },
    { path: "./fonts/SpoqaHanSansNeo-Bold.woff", weight: "700" },
  ],
  variable: "--font-spoqa",
});

export const metadata: Metadata = {
  title: "코드잇 | resources",
  description: "codeit-resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <html lang="ko">
      <body className={spoqaHanSansNeo.variable}>
        <Providers>
          <Gnb />
          {children}
        </Providers>
      </body>
    </html>
  );
}
