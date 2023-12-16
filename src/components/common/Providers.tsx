"use client";
import { NotificationProvider } from "@/components/common/notifications/context/NotificationProvider";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
//Grouped Providers client component, includes Session Provider from Next-Auth and Notification Provider using context
function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </SessionProvider>
  );
}

export default Providers;
