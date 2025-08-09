import Image from "next/image";
import Hero from "../../_components/hero";
import Services from "../../_components/services";
import About from "../../_components/about";
import Steps from "../../_components/steps";
import EcommerceCta from "../../_components/ecommerce-cta";
import { getReviews } from "@/app/actions/review";
import { ReviewsComponent } from "../../_components/reviews";

export default async function Home() {
  const { data: reviews } = await getReviews({ approved: true })
  return (
    <div>
      <Hero />
      <Services />
      <About />
      <Steps />
      {reviews && <ReviewsComponent reviews={reviews} />}
      <EcommerceCta />
    </div>
  );
}
