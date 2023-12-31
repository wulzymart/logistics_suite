import React from "react";
import SignupForm from "./signup-request";

const EcommerceCta = () => {
  return (
    <section className="text-gray-600 body-font bg-[url('/fll2.jpeg')] bg-cover relative">
      <div className="bg-black opacity-90 absolute w-full h-full  z-10]"></div>
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center relative z-30 md:px-20">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h2 className="title-font font-bold font-body text-xl md:text-3xl  text-white ">
            A trusted logistics solution for your <br />
            E-commerce business
          </h2>
          <p className="leading-relaxed mt-4 text-white text-xl">
            You dont have to worry any more. We can handle all your shipping
            across the nation. We charge all transactions from your wallet,
            while you charge your clients a convonient fee.
          </p>

          <p className="text-3xl font-bold text-blue-500 mt-3">
            Partner with us today
          </p>
        </div>
        <SignupForm message="We will contact you in minutes" />
      </div>
    </section>
  );
};

export default EcommerceCta;
