import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NewsProvider } from "@/context/NewsContext";
import { NextUIProvider } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AutContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Mundo al dia Noticias",
  description: "Creado por Benjamin Hoffman",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          <div className="pt-32 md:pt-48">
            <NewsProvider>
              <NextUIProvider>
                {children}
              </NextUIProvider>
            </NewsProvider>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
