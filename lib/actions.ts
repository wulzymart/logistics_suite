"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { NestedMiddlewareError } from "next/dist/build/utils";
import { redirect } from "next/navigation";

const api = process.env.API;

export async function getUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return redirect("/office/login");
  const { user } = session;
  console.log(user);

  return user;
}

export async function newStaffRegistration(values: any) {
  !values.user.email && delete values.user.email;
  delete values.user.confirmPassword;
  const res = await fetch(`${api}/user/staff`, {
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
  const res = await fetch(`${api}/user/staff/${user.id}/add-pin`, {
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
  const res = await fetch(`${api}/user/staff/${user.id}/change-pin`, {
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
  const res = await fetch(`${api}/user/staff/${user.id}/validate-pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    cache: "no-cache",
  });

  return await res.json();
};

export const changePassword = async (values: any) => {
  const user = await getUser();
  delete values.confirmPassword;
  const res = await fetch(`${api}/user/staff/${user.id}/change-password`, {
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

export const addCustomer = async (values: any) => {
  const user = await getUser();
  const info = `created by ${user.name} of ${user.staffDetails.officeStaffInfo.stationName}`;
  values.history = [{ info, time: new Date().toISOString() }];
  values.customerType = "Individual";
  const res = await fetch(`${api}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    cache: "no-cache",
  });

  return await res.json();
};

export const getCustomer = async (phoneOrId: string) => {
  const res = await fetch(`${api}/customers/${phoneOrId}`, {
    cache: "no-cache",
  });
  return await res.json();
};

export const addItemType = async (values: any) => {
  console.log(values);

  const res = await fetch(`${api}/item-types`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    cache: "no-cache",
  });
  if (res.ok) revalidateTag("item-types");
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
export const delItemType = async (name: string) => {
  const res = await fetch(`${api}/item-types/${name}`);
  if (res.ok) revalidateTag("item-types");
  return await res.json();
};
