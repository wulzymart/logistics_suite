import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import ChangeImgButton from "./_edit-utils/change-profile-image-button";

const Biodata = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bio Data</CardTitle>
        <div className="pt-8 pb-8 border-b">
          <div className="flex rounded-lg">
            <Image
              className="rounded-lg w-60"
              alt="tutorship logo"
              src="/avatar.jpg"
              width={100}
              height={100}
            />
          </div>
          <ChangeImgButton />
        </div>
      </CardHeader>

      <CardContent className="mt-4">
        <div className="flex flex-col gap-4 mb-4 ">
          <div className="">
            <p className="font-semibold text-sm tracking-tighter mb-2">
              First Name:
            </p>
            <p className="ml-4">John</p>
          </div>
          <div>
            <p className="font-semibold text-sm tracking-tighter mb-2">
              Last Name:
            </p>
            <p className="ml-4">James</p>
          </div>
          <div>
            <p className="font-semibold text-sm tracking-tighter mb-2">
              Phone Number(s):
            </p>
            <p className="ml-4">+2348081730978</p>
          </div>
          <div>
            <p className="font-semibold text-sm tracking-tighter mb-2">
              Email:
            </p>
            <p className="ml-4">email@example.com</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Biodata;
