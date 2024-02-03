import { Key } from "lucide-react";
import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      [key: string]: any;
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    [key: string]: any;
  }
}

declare interface APIResponseObject {
  message: string;
  success: boolean;
  [key: string]: any;
}
