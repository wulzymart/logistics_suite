import React from "react";
import Biodata from "./_components/biodata";
import WorkDetails from "./_components/work-details";
import BankDetails from "./_components/payment-info";
import PinPassword from "./_components/security";
import Title from "@/components/app_title";

const page = () => {
  return (
    <div>
      <Title title="Profile" info="" />
      <div className="flex gap-6">
        <div className="w-full shadow-sm">
          <Biodata />
        </div>
        <div className="w-full shadow-sm space-y-6">
          <WorkDetails />
          <BankDetails />
        </div>
        <div className="w-full shadow-sm">
          <PinPassword />
        </div>
      </div>
    </div>
  );
};

export default page;
