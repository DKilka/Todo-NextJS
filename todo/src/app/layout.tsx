import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Todo",
  description: "Todo list with auth and drug and drop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
