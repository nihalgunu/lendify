import Image from "next/image";
import Link from "next/link";
import Register from "./components/login/Register";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <main>
      
    <Navbar />
    
    <Register />
      
    </main>
  )
}
