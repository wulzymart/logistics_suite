import { NewWayBillProvider } from "@/contexts/new-waybill-context";

const NewWayBillLayout = ({ children }: { children: React.ReactNode }) => {
  return <NewWayBillProvider>{children}</NewWayBillProvider>;
};

export default NewWayBillLayout;
