"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import Header from "@/components/common/header";
import SignInComponent from "@/components/sign-in/SignInComponent";
import LoadingScreen from "@/components/common/loader";

export default function Home() {
  const { status, data: session } = useSession();
  if (status === "loading") {
    return <LoadingScreen />;
  }

  return <>{status === "authenticated" ? <Header /> : <SignInComponent />}</>;
}
