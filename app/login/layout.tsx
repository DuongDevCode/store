import type { Metadata } from "next";
import LoginPage from "./page";

export const metadata: Metadata = {
  title: "Login page",
  description: "Generated by create next app",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <LoginPage />
      </body>
    </html>
  )
}
