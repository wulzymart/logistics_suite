"use client";
import { useMediaQuery } from "usehooks-ts";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Nav } from "./sidebar";
import { routes } from "./data/nav-links";
import { TooltipProvider } from "@/components/ui/tooltip";

const DragableLayout = ({
  children,
  navCollapsedSize,
  defaultCollapsed = false,
}: {
  children: React.ReactNode;
  navCollapsedSize: number;
  defaultCollapsed: boolean;
}) => {
  const sm = useMediaQuery("(max-width: 767px)");
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  return sm ? (
    <>{children}</>
  ) : (
    <TooltipProvider>
      <ResizablePanelGroup
        className="min-h-[800px]"
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
      >
        <ResizablePanel
          defaultSize={15}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={12}
          maxSize={20}
          onCollapse={(): void => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={(size, prevSize) => {
            if (size >= 12) {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                false
              )}`;
            }
          }}
          className={cn(
            "px-0",
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <Nav entities={routes} isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={85}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default DragableLayout;
