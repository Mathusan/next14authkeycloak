"use client";

import Header from "@/components/common/header";
import LoadingScreen from "@/components/common/loader";
import SignInComponent from "@/components/sign-in/SignInComponent";
import { useSession } from "next-auth/react";

const SessionComponent = ({ children }: { children: React.ReactNode }) => {
  const { status, data: session } = useSession();
  if (status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <>
      {status === "authenticated" ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        <SignInComponent />
      )}
    </>
  );
};

export default SessionComponent;
