import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "Meowny: Budgeting your cat will love",
  description:
    "A gamified budgeting app. Hit your saving goals and dress up your cat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
    >
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

