import type { Metadata } from "next";
import { roboto } from '@/app/fonts';
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | Account Page',
    default: 'Sign-In Account Page',
  },
  description: "Implementing a log in page for user's profile account.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
