import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resumeify — Free Professional Resume Builder",
  description:
    "Create a professional resume in minutes. Free templates, easy-to-use builder, instant PDF download. Get hired faster with Resumeify.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
