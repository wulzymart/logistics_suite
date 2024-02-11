import React from "react";
import AddItemType from "./add_item_type";
import RemItemType from "./remove_item_type";
import AddShipmentType from "./add_shipment_type";

const page = () => {
  return (
    <div className="space-y-8">
      <AddItemType />
      <RemItemType />
      <AddShipmentType />
    </div>
  );
};

export default page;
