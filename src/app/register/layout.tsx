"use client";

import LoadingScreen from "@/components/common/loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return <LoadingScreen />;

  return (
    <>
      <html lang="en">
        <body>{children}</body>
      </html>
    </>
  );
}
