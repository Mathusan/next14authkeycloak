"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { useSession } from "next-auth/react";
export default function Home() {
  const { status, data: session } = useSession();
  if (status === "authenticated") {
    return <h1>Hello {session.user?.email} </h1>;
  } else {
    return <h1>Login/Register to continue</h1>;
  }
}
