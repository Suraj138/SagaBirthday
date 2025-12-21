import { Kalam } from "next/font/google";
import "./globals.css";

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata = {
  title: "Happy Birthday!",
  description: "Celebrate your day with joy and happiness!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${kalam.className} antialiased bg-black select-none`}
      >
        {children}
      </body>
    </html>
  );
}
