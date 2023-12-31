import { VscStarFull } from "react-icons/vsc";
import { BsPeopleFill } from "react-icons/bs";
import About from "../../../_components/about";
import Steps from "../../../_components/steps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    " Haulage Services in Nigeria: Choose First Line Logistics Nigeria Limited",
  description:
    "Need reliable and efficient haulage services in Nigeria? Look no further than First Line Logistics Nigeria Limited. Our experienced team has the expertise and equipment to handle all your transportation needs, from bulk cargo to individual packages. With a commitment to quality and customer service, we ensure your goods are delivered on time and in perfect condition. Contact us today to learn more about our haulage services in Nigeria.",
  openGraph: {
    url: "https://firstlinelogistics.ng",
    title: "First Line Logistics Nigeria LTD",
    description:
      "Need reliable and efficient haulage services in Nigeria? Look no further than First Line Logistics Nigeria Limited. Our experienced team has the expertise and equipment to handle all your transportation needs, from bulk cargo to individual packages. With a commitment to quality and customer service, we ensure your goods are delivered on time and in perfect condition. Contact us today to learn more about our haulage services in Nigeria.",
    images: [
      {
        url: "https://www.firstlinelogistics.ng/logo.png",
        width: 800,
        height: 600,
        alt: "First Line Logistics",
        type: "image/png",
      },
    ],
    siteName: "First Line Logistics",
  },
};
const Abt = () => {
  return (
    <main>
      <About />

      <div className="w-full mx-auto text-center py-12 max-w-4xl">
        <div className="mb-10">
          <h3 className="font-bold mb-5 text-3xl font-body">Our Vision</h3>
          <p className="text-xl">
            Our aim is to make first Line Logistics Ltd a top brand logistics
            solutions providers to the Nigerian community
          </p>
        </div>
        <div className="mb-10">
          <h3 className="font-bold mb-5 text-3xl font-body">Our Mission</h3>
          <p className="text-xl">
            To deliver excellent and world className transport and Logistics
            services to our esteem customers with guaranteed safety and
            efficiency by utilizing quality personnel and resource management
          </p>
        </div>
        <div className="mb-10">
          <h3 className="font-bold mb-5 text-3xl font-body">Our Objectives</h3>
          <p className="text-xl">
            To provide efficiency supply chain management in transport and
            Logistics industry.
          </p>
          <p className="text-xl">
            To be faithful and reliable to our clients and our esteemed
            customers by keeping our promises for timely, safely and fast
            deliveries.
          </p>
          <p className="text-xl">To fulfill customers requirements.</p>
          <p className="text-xl">
            To provide affordable services to the Nigerian community.
          </p>
        </div>
      </div>

      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <div className="mb-10 md:mb-16">
            <h2 className="text-black font-body text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
              Our competitive advantage
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 xl:gap-16">
            <div className="flex flex-col gap-4 md:gap-6 justify-center items-center text-center">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-blue-600 text-white rounded-lg md:rounded-xl shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Growth
                </h3>
                <p className="text-gray-800 mb-2">
                  We keep expanding our reach by the day, so that our services
                  are available in all parts of the nation
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center gap-4 md:gap-6">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-blue-600 text-white rounded-lg md:rounded-xl shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Security
                </h3>
                <p className="text-gray-800 mb-2">
                  We ensure every item is secured until it is delivered
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center gap-4 md:gap-6">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-blue-600 text-white rounded-lg md:rounded-xl shadow-lg">
                <VscStarFull fontSize="24px" />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Trust</h3>
                <p className="text-gray-900 mb-2">
                  We seize every opportunity to buid your trust, so we ensure
                  that every shipment gives you a good lasting experience
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center gap-4 md:gap-6">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-blue-600 text-white rounded-lg md:rounded-xl shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Speed</h3>
                <p className="text-gray-800 mb-2">
                  We beleive time is essential, we have it as a point of duty to
                  ensure all items are delivered in short time
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center gap-4 md:gap-6">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-blue-600 text-white rounded-lg md:rounded-xl shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Support
                </h3>
                <p className="text-gray-800 mb-2">
                  We provide outstanding customer support, guiding you through
                  every process hassel free.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center gap-4 md:gap-6">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-blue-600 text-white rounded-lg md:rounded-xl shadow-lg">
                <BsPeopleFill />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Relationship
                </h3>
                <p className="text-gray-800 mb-2">
                  We believe in building a strong relationship beyond the items
                  being shipped, but rather share a mutual respect for our
                  clients and customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Steps />
    </main>
  );
};

export default Abt;
