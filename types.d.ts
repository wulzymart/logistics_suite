import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
      userName: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    uid: string;
    userName: string;
    role: string;
  }
}

declare interface APIResponseObject {
  message: string;
  success: boolean;
  [key: string]: any;
}
