import React from "react";
import { Footer7 } from "./footer";
import HeroHeader from "./hero-section";
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
