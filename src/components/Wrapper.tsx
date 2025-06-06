import React from "react";
import { Footer7 } from "./footer-7";
import HeroHeader from "./hero-section-1";

interface WrapperProps {
  children: React.ReactNode;
}
const Wrapper = ({ children }: WrapperProps) => {
  return (
    <>
      <HeroHeader />
        {children}
      <Footer7 />
    </>
  );
};

export default Wrapper;
