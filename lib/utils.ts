import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { Lga, State } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function validatePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function compare(a: State | Lga, b: State | Lga) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
