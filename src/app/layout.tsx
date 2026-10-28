import "./globals.css";
import Link from "next/dist/client/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <p>=== Root Layout Header</p>
          <nav>
            <Link href="/"> home</Link> | <Link href="counter">Counter</Link>
            <br />
            <br />
            Slug Page Menu :&nbsp;
            <Link href="/next.js">next.js</Link>&nbsp;|&nbsp;
            <Link href="/routing">routing</Link>&nbsp;|&nbsp;
            <Link href="/ssr-ssg">ssr-ssg</Link>&nbsp;|&nbsp;
            <Link href="/dynamic-router">dynamic-router</Link>
            <br />
          </nav>
        </header>
        <main>{children}</main>
        <footer>===Root Layout Footer</footer>
      </body>
    </html>
  );
}
