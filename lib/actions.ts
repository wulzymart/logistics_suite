"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const api = process.env.API;

export async function getUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return redirect("/office/login");
  const { user } = session;
  return user;
}

export async function newUserRegistration(values: any) {
  !values.email && delete values.email;
  delete values.confirmPassword;
  const res = await fetch(`${api}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return await res.json();
}

export const addPin = async (values: any) => {
  const user = await getUser();
  delete values.confirmPin;
  const res = await fetch(`${api}/user/${user.id}/add-pin`, {
    method: "PATCH",
    body: JSON.stringify({
      ...values,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  if (res.ok) {
    revalidateTag("pin-status");
    return await res.json();
  } else {
    return await res.json();
  }
};

export const changePin = async (values: any) => {
  const user = await getUser();
  delete values.confirmPin;
  const res = await fetch(`${api}/user/${user.id}/change-pin`, {
    method: "PATCH",
    body: JSON.stringify({
      ...values,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return await res.json();
};

export const verifyPin = async (values: any) => {
  const user = await getUser();
  const res = await fetch(`${api}/user/${user.id}/validate-pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return await res.json();
};

export const changePassword = async (values: any) => {
  const user = await getUser();
  delete values.confirmPassword;
  const res = await fetch(`${api}/user/${user.id}/change-password`, {
    method: "PATCH",
    body: JSON.stringify({
      ...values,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  return await res.json();
};

export const addStation = async (values: any) => {
  values.phoneNumbers = values.phoneNumbers.split(" ");
  const res = await fetch(`${api}/stations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return await res.json();
};
