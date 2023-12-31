import React from "react";
import HailIcon from "@mui/icons-material/Hail";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import MopedIcon from "@mui/icons-material/Moped";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Link from "next/link";
import { Handshake } from "@mui/icons-material";

const Services = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto pt-16 lg:pt-28 pb-24 lg:pb-36 ">
        <div className="w-[90%] md:w-[80%] text-center mx-auto mb-20">
          <h3 className="md:text-3xl md:font-bold text-2xl font-medium text-slate-800 text-center">
            No need to leave your comfort zone, We will come for pick-up
          </h3>
          <p className="text-slate-700 mt-4">
            We offer affordable home pickup delivery services
          </p>
        </div>
        <div className="w-full">
          <h1 className="text-center mb-8 font-bold text-black text-4xl lg:text-4xl font-body">
            Our Delivery Services
          </h1>
          <div className="w-full flex flex-wrap lg:flex-wrap justify-center  mt-15 ">
            <Link
              href="/pickup-request"
              className="text-center cursor-pointer lg:text-left relative overflow-hidden border border-gray-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 py-12 px-8 bg-white hover:bg-blue-900 hover:text-white text-gray-800 hover:-translate-y-4 hover:transition/home/mart/Documents/fll-website/src/components/Steps.jsx"
            >
              <span className="inline-flex mb-6 text-5xl">
                <HailIcon fontSize="inherit" />
              </span>
              <h2 className="font-bold  mb-5 text-xl">Pick Up</h2>
              <p className="text-sm  ">
                Request a home/office/shop item pick up for express or regular
                delivery.
              </p>
            </Link>
            <Link
              href="/services"
              className="text-center cursor-pointer lg:text-left relative overflow-hidden border border-gray-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 py-12 px-8 bg-white hover:bg-blue-900 hover:text-white text-gray-800 hover:-translate-y-4 hover:transition/home/mart/Documents/fll-website/src/components/Steps.jsx"
            >
              <span className="inline-flex mb-6 text-5xl">
                <LocalShippingIcon fontSize="inherit" />
              </span>
              <h2 className="font-bold  mb-5 text-xl">Haulage</h2>
              <p className="text-sm ">
                We provide haulage services for relocation, or transport of
                warehouse supplies and so on.
              </p>
            </Link>
            <Link
              href="/services"
              className="text-center cursor-pointer lg:text-left relative overflow-hidden border border-gray-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 py-12 px-8 bg-white hover:bg-blue-900 hover:text-white text-gray-800 hover:-translate-y-4 hover:transition/home/mart/Documents/fll-website/src/components/Steps.jsx"
            >
              <span className="inline-flex mb-6 text-5xl">
                <AirportShuttleIcon fontSize="inherit" />
              </span>
              <h2 className="font-bold  mb-5 text-xl">On-time Delivery</h2>
              <p className="text-sm ">
                Move your items to any part of the country in reliable time.
              </p>
            </Link>
            <Link
              href="/services"
              className="text-center cursor-pointer lg:text-left relative overflow-hidden border border-gray-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 py-12 px-8 bg-white hover:bg-blue-900 hover:text-white text-gray-800 hover:-translate-y-4 hover:transition/home/mart/Documents/fll-website/src/components/Steps.jsx"
            >
              <span className="inline-flex mb-6 text-5xl">
                <SpeedIcon fontSize="inherit" />
              </span>
              <h2 className="font-bold   mb-5 text-xl">Express Shipment</h2>
              <p className="text-sm  ">
                Move your items to any location within the country within a
                period of about 24hrs.
              </p>
            </Link>

            <Link
              href="/services"
              className="text-center cursor-pointer lg:text-left relative overflow-hidden border border-gray-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 py-12 px-8 bg-white hover:bg-blue-900 hover:text-white text-gray-800 hover:-translate-y-4 hover:transition"
            >
              <span className="inline-flex mb-6 text-5xl">
                <Handshake fontSize="inherit" />
              </span>
              <h2 className="font-bold  mb-5 text-xl">On Demand Services </h2>
              <p className="text-sm ">
                We provide several on demand services, e.g cold chain
                deliveries, additional security etc.
              </p>
            </Link>

            <Link
              href="/services"
              className="text-center cursor-pointer lg:text-left relative overflow-hidden border border-gray-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 py-12 px-8 bg-white hover:bg-blue-900 hover:text-white text-gray-800 hover:-translate-y-4 hover:transition/home/mart/Documents/fll-website/src/components/Steps.jsx"
            >
              <span className="inline-flex mb-6 text-5xl">
                <MopedIcon fontSize="inherit" />
              </span>
              <h2 className="font-bold  mb-5 text-xl">Last Man Delivery</h2>
              <p className="text-sm ">
                We provide home delivery services with our network of last
                delivery men to make the process hassle free.
              </p>
            </Link>
            <Link
              href="/services"
              className="text-center cursor-pointer lg:text-left relative overflow-hidden border border-gray-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 py-12 px-8 bg-white hover:bg-blue-900 hover:text-white text-gray-800 hover:-translate-y-4 hover:transition/home/mart/Documents/fll-website/src/components/Steps.jsx"
            >
              <span className="inline-flex mb-6 text-5xl">
                <FitnessCenterIcon fontSize="inherit" />
              </span>
              <h2 className="font-bold mb-5 text-xl">Loading & Offloading </h2>
              <p className="text-sm">
                Need help with the heavy lifting? <br /> We have the hands to
                lift yout items for the loading and offloading.
              </p>
            </Link>

            <Link
              href="/quotation"
              className="text-center cursur-pointer lg:text-left relative overflow-hidden border border-gray-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 py-12 px-8 bg-white hover:bg-blue-900 hover:text-white text-gray-800 hover:-translate-y-4 hover:transition/home/mart/Documents/fll-website/src/components/Steps.jsx"
            >
              <span className="inline-flex mb-6 text-5xl">
                <RequestQuoteIcon fontSize="inherit" />
              </span>
              <h2 className="font-semibold  mb-5 text-xl">Get a Quick Quote</h2>
              <p className="text-sm ">Get a cost estimate for shipments.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
