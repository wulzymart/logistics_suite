import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section className="bg-black">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 bg-black">
        <div className="font-light text-white sm:text-lg">
          <h2 className="mb-4 text-4xl font-extrabold text-white font-body">
            About <span className="text-blue-700">First</span>{" "}
            <span className="text-red-600">Line</span>{" "}
            <span className="text-blue-700">Logistics</span> Limited
          </h2>
          <p className="mb-4">
            We are a leading Nigerian freight forwarding company. We render
            various logistics services within the country to help fast and
            hassle free delivery of supplies within the country.
          </p>
          <p>
            We deliver excelent and world class transport and logistic services,
            providing an efficient supply chain management in Nigeria&lsquo;s
            transport and logistics industry
          </p>
          <p>
            We hold to a high level of integrity, trust, and care, treating
            every item of supply as fragile on the move.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="w-[250px] h-[400px]">
            <Image
              className="w-full rounded-lg"
              width={400}
              height={800}
              src="https://images.unsplash.com/photo-1591419478162-a4dd21b7ec0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              alt="Logistics trailers"
            />
          </div>
          <div className="w-[250px] h-[400px]">
            <Image
              className="w-full rounded-lg"
              width={400}
              height={800}
              src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              alt="Logistics trailers"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
