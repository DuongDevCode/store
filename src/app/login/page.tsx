import MainPage from "./main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login app",
};
function PageLogin() {
  return <MainPage />
}

export default PageLogin