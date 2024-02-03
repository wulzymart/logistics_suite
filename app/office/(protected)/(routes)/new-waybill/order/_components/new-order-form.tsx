"use client";

import { GetCustomer } from "@/contexts/new-waybill-context";
import { useRouter } from "next/navigation";

const NewOrderForm = () => {
  const router = useRouter();
  const customer = GetCustomer();
  if (!customer) router.replace("/office/new-waybill");

  return <div>NewOrderForm</div>;
};

export default NewOrderForm;
