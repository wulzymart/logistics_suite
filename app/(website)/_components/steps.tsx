import React from "react";
import {
  DeliveryDining,
  Description,
  Handshake,
  ShareLocation,
} from "@mui/icons-material";

const Steps = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className=" mb-8 lg:mb-16">
          <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-90 text-center font-body">
            Logistics has never been easier
          </h2>
        </div>
        <div className="flex flex-wrap items-start">
          <div className="w-full sm:w-1/2 lg:w-1/4 p-5 flex flex-col text-center justify-center items-center gap-3">
            <span className="text-5xl text-center">
              <Handshake fontSize="inherit" />
            </span>

            <h3 className="mb-2 text-xl font-bold dark:text-white">
              1. Engage Us
            </h3>
            <p className="text-gray-500 ">
              Walk into our Office or request for a pickup.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 p-5 flex flex-col text-center justify-center items-center gap-3">
            <span className="text-5xl text-center">
              <Description fontSize="inherit" />
            </span>

            <h3 className="mb-2 text-xl font-bold dark:text-white">
              2. Create your Waybil
            </h3>
            <p className="text-gray-500 ">
              Get your shipment created and valuated.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 p-5 flex flex-col text-center justify-center items-center gap-3">
            <span className="text-5xl text-center">
              <ShareLocation fontSize="inherit" />
            </span>

            <h3 className="mb-2 text-xl font-bold dark:text-white">
              3. Receive Tracking ID
            </h3>
            <p className="text-gray-500 ">
              Your tracking ID will be generated and sent to you within minutes.
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 p-5 flex flex-col text-center justify-center items-center gap-3">
            <span className="text-5xl text-center">
              <DeliveryDining fontSize="inherit" />
            </span>

            <h3 className="mb-2 text-xl font-bold dark:text-white">
              4. Quick Delivery
            </h3>
            <p className="text-gray-500 ">
              Shipments are delivered hassel free either at our stations or home
              delivery with instant notification on arrival.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
