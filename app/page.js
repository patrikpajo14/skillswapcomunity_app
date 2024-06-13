"use client"
import AuthForm from "@/components/AuthForm";
import "@/styles/globals.css";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="auth-page">
      <div className="flex-1 h-full relative">
        <Image
          src="/assets/images/background.jpg"
          alt="background"
          width={1024}
          height={1024}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="inner card py-[20px] px-[35px] w-[360px] flex flex-col justify-center">
        <AuthForm />
      </div>
    </div>
  );
}
