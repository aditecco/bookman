import "../styles/index.scss";
import { Archivo, Fira_Sans, Work_Sans } from "next/font/google";
import Head from "next/head";
import { ReactNode } from "react";
import { Metadata } from "next";

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
      <Head>
        <link
          href="https://fonts.gstatic.com/s/materialicons/v142/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
          rel="stylesheet"
        />
      </Head>

      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
