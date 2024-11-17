import React from "react";
import {ConstructionIcon} from "lucide-react";

const page = () => {
  return <div className='w-full h-[500px] flex flex-col gap-0 items-center justify-center text-center'><div className='w-full flex items-center justify-center'><ConstructionIcon size='200'/></div><p className='text-2xl font-medium text-gray-600'>The requested page is under development</p><p className='text-gray-600'>Contact us for your home pickup on </p></div>;
};

export default page;
