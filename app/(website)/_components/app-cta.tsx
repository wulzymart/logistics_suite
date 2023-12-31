import Image from "next/image";
import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const AppCTA = () => {
  return (
    <div className="bg-black flex  justify-center items-center gap-20 py-20">
      <div className="  py-12 px-4 sm:px-6  lg:py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block font-body">Coming Soon</span>
          <span className="block text-white mt-5 font-body">
            First Line Logistics Apps
          </span>
        </h2>
        <div className="mt-20 flex">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              <FaGooglePlay /> <span className="ml-3"> Google Play</span>
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-red-600 hover:bg-indigo-50"
            >
              <FaApple /> <span className="ml-3">Apple Store</span>
            </a>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Image
          className="w-[100%]"
          width={200}
          height={400}
          alt="smart phone"
          src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=367&q=80"
        />
      </div>
    </div>
  );
};

export default AppCTA;
