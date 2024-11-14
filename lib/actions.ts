"use server";

// import { authOptions } from "@/app/api/auth/[...nextauth]/option";
// import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { NestedMiddlewareError } from "next/dist/build/utils";
import { redirect } from "next/navigation";

const api = process.env.API;

export const addStation = async (values: any) => {
  values.phoneNumbers = values.phoneNumbers.split(" ");
  const res = await fetch(`${api}/stations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    cache: "no-cache",
  });
  if (res.ok) {
    revalidateTag("stations_list");
    revalidateTag(`${values.state}-stations`);
  }

  return await res.json();
};

export const getStates = async () => {
  const res = await fetch(`${api}/states`, {
    next: { tags: [`states_list`] },
  });
  return res.json();
};

export const getLgas = async (state: string) => {
  const res = await fetch(`${api}/states/${state}/lgas`, {
    next: { tags: [`${state}-lgas`] },
  });
  return res.json();
};

export const getStateStations = async (state: string) => {
  const res = await fetch(`${api}/states/${state}/stations`, {
    next: { tags: [`${state}-stations`] },
  });
  return res.json();
};

export const getStations = async () => {
  const res = await fetch(`${api}/stations`, {
    next: { tags: [`stations_list`] },
  });
  return res.json();
};


export const getCustomer = async (phoneOrId: string) => {
  const res = await fetch(`${api}/customers/${phoneOrId}`, {
    cache: "no-cache",
  });
  return await res.json();
};

export const getItemTypes = async () => {
  const res = await fetch(`${api}/item-types`, {
    next: {
      tags: ["item-types"],
    },
  });
  return await res.json();
};

export const getAdditionalCharges = async () => {
  const res = await fetch(`${api}/additional-charges`, {
    next: {
      tags: ["additional-charges"],
    },
  });
  return await res.json();
};
