import "../styles/index.scss";
import { Archivo, Fira_Sans, Work_Sans } from "next/font/google";
import { ReactNode } from "react";
import { Metadata } from "next";
import QueryProvider from "../providers/QueryProvider";

const archivo = Archivo({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const firaSans = Fira_Sans({
  weight: ["400"],
  subsets: ["latin"],
});

const workSans = Work_Sans({
  weight: ["500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookMan",
  description: "Web app created with Next.js.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.className} ${firaSans.className} ${workSans.className}`}
    >
      <head>
        <link
          href="https://fonts.gstatic.com/s/materialicons/v142/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
          rel="stylesheet"
        />
      </head>

      <body>
        <QueryProvider>
          <div id="root">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
