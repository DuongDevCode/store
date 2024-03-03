import type { Metadata } from "next";
import AuthenticationPage from "./page";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthenticationPage />
      </body>
    </html>
  )
}
