import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function validatePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash, function (err, result) {
    return result;
  });
}
