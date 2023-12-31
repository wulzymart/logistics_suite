import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:flex md:justify-around">
          <div className="flex items-center justify-center md:w-1/3">
            <Link href="/" className="">
              <Image
                src="/logo.png"
                alt="First Line Logistics Logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="mr-10">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <div className="flex flex-col md:flex-row gap-10">
              <div>
                <p className="text-gray-600 mb-2">
                  Email:{" "}
                  <a
                    className="mr-0"
                    href="mailto:customerservice@firstlinelogistics.ng"
                  >
                    customerservice@firstlinelogistics.ng
                  </a>
                </p>
                <p className="text-gray-600 mb-2">
                  Phone:{" "}
                  <a className="block " href="tel:(+234)8167900003">
                    (+234)8167900003
                  </a>
                </p>
                <p className="text-gray-600 mb-2">
                  Phone:{" "}
                  <a className="block " href="tel:(+234)8133434400">
                    (+234)8133434400
                  </a>
                </p>
              </div>

              <div className="">
                <h3 className="font-medium mb-2">Head office</h3>
                <p className="text-gray-600 mb-2 w-60">
                  km 57, Agasa junction opposite Dr. Ado Ibrahim Building
                </p>
                <p className="text-gray-600 mb-2">Agasa Okene Kogi, Nigeria</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-gray-600 hover:text-gray-900" href="/">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  className="text-gray-600 hover:text-gray-900"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  className="text-gray-600 hover:text-gray-900"
                  href="/services"
                >
                  Services
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  className="text-gray-600 hover:text-gray-900"
                  href="/tracking"
                >
                  Track your item
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  className="text-gray-600 hover:text-gray-900"
                  href="/quotation"
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
