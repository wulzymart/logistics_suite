import React from "react";
import CheckNewCustomerPage from "./start/check-existing";
import NewCustomerPage from "./add-customer/add-customer-page";
import NewOrderPage from "./order/new-order-page";

const NewWaybilPage = ({
  searchParams: { path },
}: {
  searchParams: { path: string };
}) => {
  if (!path) return <CheckNewCustomerPage />;
  if (path == "new-customer") return <NewCustomerPage />;
  if (path == "order") return <NewOrderPage />;
};

export default NewWaybilPage;
