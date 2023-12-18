import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Loader from "@/components/common/loader";
import Providers from "@/components/common/Providers";

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
          <Providers>{children}</Providers>
        </body>
      </html>
    </>
  );
}
