import React from "react";
import AddItemType from "./add_item_type";
import RemItemType from "./remove_item_type";
import AddShipmentType from "./add_shipment_type";
import RemShipmentType from "./remove_shipment_type";
import Title from "@/components/app_title";
import AddAdditionalCharge from "./add_additional-charge";
import RemAdditionalCharge from "./remove_additional-charge";

const page = () => {
  return (
    <div className="space-y-8">
      <Title
        title="Company Operations Settings"
        info="Make changes to company key company indices, these changes affect company pricing"
      />
      <AddItemType />
      <RemItemType />
      <AddShipmentType />
      <RemShipmentType />
      <AddAdditionalCharge />
      <RemAdditionalCharge />
    </div>
  );
};

export default page;
