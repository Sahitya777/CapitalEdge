import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/SideBar";
import PortFolioDashboard from "@/components/PortfolioDashboard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <PortFolioDashboard/>
    </div>
  );
}
