import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BankDetails = () => {
  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <CardTitle>Account Info</CardTitle>
      </CardHeader>
      <CardContent className="mt-8">
        <div className="flex flex-col gap-4 mb-4 ">
          <div className="">
            <p className="font-semibold text-sm tracking-tighter mb-2">
              Bank Name:
            </p>
            <p className="ml-4">Access bank</p>
          </div>
          <div>
            <p className="font-semibold text-sm tracking-tighter mb-2">
              Account Number:
            </p>
            <p className="ml-4">1234567890</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankDetails;
