import React from "react";
import { ConstructionIcon } from "lucide-react";
import { PickupRequestForm } from "@/app/(website)/_components/pickup-form";
import { createAdminClient } from "@/lib/supabase";
import Header1 from "@/components/Header1";

const page = async () => {


  return <div className='w-full  space-y-10'>
    <Header1 title="Pickup Request" />
    <PickupRequestForm />
  </div>;
};

export default page;
