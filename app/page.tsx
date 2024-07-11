import Image from "next/image";
import Link from "next/link";
import LoginGUI from "./components/login/LoginGUI";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <main>
      
    <Navbar />

    <LoginGUI />
      
    </main>
  )
}
