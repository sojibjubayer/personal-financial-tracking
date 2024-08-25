"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const roboto = Roboto({ subsets: ["latin"], weight: ['400','500', '700'] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className + "w-[90%] mx-auto"}>
        <Provider store={store}>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
