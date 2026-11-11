import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABDUL NAI | Luxury Salon & Master Grooming Experience",
  description: "Experience the pinnacle of gentleman's grooming, royal haircutting, artisan beard sculpting, and rejuvenating skin rituals at ABDUL NAI.",
  keywords: ["Abdul Nai", "luxury salon", "gentlemen grooming", "barber Mumbai", "salon booking", "haircut", "beard styling"],
};

export default function RootLayout({
  children,
}: Readform<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </head>
      <body className="bg-salon-dark text-salon-ivory antialiased selection:bg-gold-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
type Readform<T> = T;
