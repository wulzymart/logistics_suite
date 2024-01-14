import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Password from "./_edit-utils/password";
import Pin from "./_edit-utils/pin";

const PinPassword = () => {
  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <CardTitle>Pin & Password</CardTitle>
      </CardHeader>
      <CardContent className="mt-8">
        <div className="">
          <p className="font-semibold text-sm tracking-tighter mb-2">
            Password:
          </p>
          <Password />
        </div>
        <div className="">
          <p className="font-semibold text-sm tracking-tighter mb-2">Pin:</p>
          <Pin />
        </div>
      </CardContent>
    </Card>
  );
};

export default PinPassword;
