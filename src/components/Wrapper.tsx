import React from "react";
import { Footer7 } from "./footer-7";
import HeroHeader from "./hero-section-1";
  import { Bounce, ToastContainer } from 'react-toastify';
interface WrapperProps {
  children: React.ReactNode;
}
const Wrapper = ({ children }: WrapperProps) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <HeroHeader />
      <div className="">
        {children}
        <Footer7 />
      </div>
    </>
  );
};

export default Wrapper;
