import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const WorkDetails = () => {
  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <CardTitle>Work Info</CardTitle>
      </CardHeader>
      <CardContent className="mt-8">
        <div className="flex flex-col gap-4 mb-4 ">
          <div className="">
            <p className="font-semibold text-sm tracking-tighter mb-2">Role:</p>
            <p className="ml-4">Office Staff</p>
          </div>
          <div>
            <p className="font-semibold text-sm tracking-tighter mb-2">
              Station:
            </p>
            <p className="ml-4">Station Name</p>
          </div>
          <div>
            <p className="font-semibold text-sm tracking-tighter mb-2">
              Employed Since:
            </p>
            <p className="ml-4">June 2023</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkDetails;
