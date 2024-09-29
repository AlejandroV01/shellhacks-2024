import { LandingPage } from "@/components/LandingPage";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Main() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <LandingPage />
    </div>
  );
}
