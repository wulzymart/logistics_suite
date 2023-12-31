import Header1 from "@/components/Header1";
import AppCTA from "../../../_components/app-cta";
import EcommerceCta from "../../../_components/ecommerce-cta";
import { default as ServeList } from "../../../_components/services";
import Steps from "../../../_components/steps";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "First Line Logistics || Trusted Haulage Company in Nigeria",
  description:
    "Trust First line logistics NG LTD for all your haulage needs in Nigeria. Our reliable and efficient services are designed to meet the needs of businesses of all sizes. With a fleet of modern vehicles and a team of experienced drivers, we offer a range of haulage",
  openGraph: {
    url: "https://firstlinelogistics.ng",
    title: "First Line Logistics Nigeria LTD",
    description:
      "Trust First line logistics NG LTD for all your haulage needs in Nigeria. Our reliable and efficient services are designed to meet the needs of businesses of all sizes. With a fleet of modern vehicles and a team of experienced drivers, we offer a range of haulage",
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
const Services = () => {
  return (
    <>
      <Header1 title="Our Services" />
      <ServeList />
      <EcommerceCta />
      <Steps />
      <AppCTA />
    </>
  );
};

export default Services;
