import "./globals.css";
import Link from "next/dist/client/link";
import ThemeStatus from "../components/ThemeStatus";
import ThemeProvider from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <header>
            <p>=== Root Layout Header</p>
            <nav>
              <Link href="/"> home</Link> | <Link href="counter">Counter</Link>
              <br />
              <Link href="/interleaved">Interleaved</Link> |{" "}
              <Link href="client">Client</Link>
              <br />
              <br />
              Slug Page Menu :&nbsp;
              <Link href="/next.js">next.js</Link>&nbsp;|&nbsp;
              <Link href="/routing">routing</Link>&nbsp;|&nbsp;
              <Link href="/ssr-ssg">ssr-ssg</Link>&nbsp;|&nbsp;
              <Link href="/dynamic-router">dynamic-router</Link>
              <br />
            </nav>
            <ThemeStatus />
          </header>
          <main>{children}</main>
          <footer>===Root Layout Footer</footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
