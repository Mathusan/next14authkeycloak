import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/common/Providers";
import SessionComponent from "@/components/common/auth/withSession";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body>
          <Providers>
            <SessionComponent>{children}</SessionComponent>
          </Providers>
        </body>
      </html>
    </>
  );
}
