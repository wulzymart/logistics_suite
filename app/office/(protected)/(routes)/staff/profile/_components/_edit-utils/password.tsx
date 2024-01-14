import { Button } from "@/components/ui/button";
import React from "react";
import ChangePassword from "./change-password";

const Password = () => {
  return (
    <div className="flex justify-between">
      <p className="ml-4">******</p>
      <ChangePassword />
    </div>
  );
};

export default Password;
