import Header1 from "@/components/Header1";
import QuotationForm from "./quotation-form";

const Quotation = () => {
  return (
    <main>
      <Header1 title="Get a Quote" />

      <div>
        <div className="w-full bg-gray-100 rounded-lg p-8 md:p-20 flex flex-col  mt-10 md:mt-0 pb-20">
          <h2 className="w-full text-gray-900 text-xl font-bold font-body px-5 ">
            Enter the following information
          </h2>
          <p className="w-full text-gray-500 px-5 mb-5">
            We will contact you in minutes
          </p>
          <QuotationForm />
        </div>
      </div>
    </main>
  );
};

export default Quotation;
