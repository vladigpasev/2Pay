"use client";

import { useAtom } from "jotai";
import { Footer } from "./Footer";
import { Header, themeAtom } from "./Header";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [theme] = useAtom(themeAtom);
  return (
    <div
      className="w-full max-w-[1536px] relative left-1/2 -translate-x-1/2"
      data-theme={theme}
    >
      <Header />
      <div className="h-fit min-h-[calc(100vh-65px)]">{children}</div>
      <Footer />
    </div>
  );
};
