"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { GetCustomer, SetCustomer } from "@/contexts/new-waybill-context";
import { getCustomer } from "@/lib/actions";
import { ngPhoneNumberSchema } from "@/lib/zodSchemas";
import { useRouter } from "next/navigation";
import React, { startTransition, useState } from "react";

const CheckNewCustomerPage = () => {
  const [isNewCustomer, setIsNewCustomer] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const setCustomer = SetCustomer();
  const router = useRouter();

  const handleClick = () => {
    return isNewCustomer === "Yes"
      ? router.push("/office/new-waybill?path=new-customer")
      : startTransition(() => {
          if (ngPhoneNumberSchema.safeParse(customerPhone).success) {
            getCustomer(customerPhone).then((data) => {
              if (data.success) {
                setCustomer(data.customer);

                return router.push("/office/new-waybill?path=order");
              }
              toast({
                variant: "destructive",
                description: data.message,
              });
            });
          } else
            toast({
              variant: "destructive",
              description: "Please provide a valid phone number",
            });
        });
  };
  return (
    <div className="flex h-[400px] items-center justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 space-y-6">
        <div>
          <Label className="block mb-3">New Customer?</Label>
          <Select
            onValueChange={(value: string) => setIsNewCustomer(value)}
            defaultValue={isNewCustomer}
            value={isNewCustomer}
          >
            <SelectTrigger className="w-full">
              {isNewCustomer ? (
                <SelectValue placeholder="Select One" className="w-full" />
              ) : (
                "Select One"
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isNewCustomer === "No" && (
          <div>
            <Label className="block mb-3">Customer Phone:</Label>
            <Input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.currentTarget.value)}
              placeholder="e.g +23480XXXXXXXX"
            />
          </div>
        )}
        <Button
          className="w-full"
          onClick={handleClick}
          disabled={isNewCustomer === ""}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CheckNewCustomerPage;
