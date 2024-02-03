"use client";
import { createContext, useContext, useState } from "react";

export const NewWaybillContext = createContext<any>(null);

export const NewWayBillProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [customer, setCustomer] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);

  return (
    <NewWaybillContext.Provider value={{ customer, setCustomer }}>
      {children}
    </NewWaybillContext.Provider>
  );
};

export const GetCustomer = () => {
  const { customer } = useContext(NewWaybillContext);
  return customer;
};

export const SetCustomer = () => {
  const { setCustomer } = useContext(NewWaybillContext);
  if (!setCustomer) throw new Error("No NewWayBill Provider set");
  return setCustomer;
};
