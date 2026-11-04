"use client";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <p>=== Client Layout Header</p>
        {children}
      </header>
      <footer>=== Client Layout Footer</footer>
    </div>
  );
}
