import React from "react";
import StationForm from "./station form";
import Title from "@/components/app_title";

const page = () => {
  return (
    <div>
      <Title
        title="Register Station"
        info="Please provide the information for your station"
      />
      <StationForm />
    </div>
  );
};

export default page;
