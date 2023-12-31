import Image from "next/image";
import Hero from "../../_components/hero";
import Services from "../../_components/services";
import About from "../../_components/about";
import Steps from "../../_components/steps";
import EcommerceCta from "../../_components/ecommerce-cta";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <About />
      <Steps />
      <EcommerceCta />
    </div>
  );
}
