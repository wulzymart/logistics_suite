import React from "react";
import Navbar from "../_components/navbar";
import { cookies } from "next/headers";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DragableLayout from "../_components/dragableLayout";

const OfficeLayout = ({ children }: { children: React.ReactNode }) => {
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  return (
    <main>
      <Navbar />
      <DragableLayout defaultCollapsed={defaultCollapsed} navCollapsedSize={4}>
        <div className="p-10 md:px-10">{children}</div>
      </DragableLayout>
    </main>
  );
};

export default OfficeLayout;
