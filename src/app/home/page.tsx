import MainPage from "./main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home app",
};
function PageLogin() {
  return <MainPage />
}

export default PageLogin