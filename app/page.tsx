import Image from "next/image";
import Link from "next/link";
import LoginGUI from "./login/LoginGUI";
import Navbar from "./navbar/Navbar";

export default function Home() {
  return (
    <main>
      
    <Navbar />

    <LoginGUI />

      
    </main>
  )
}
