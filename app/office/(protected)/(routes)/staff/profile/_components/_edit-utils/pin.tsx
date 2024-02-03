import React from "react";
import AddPin from "./add-pin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";
import ChangePin from "./change-pin";
import { APIResponseObject } from "@/types";

const Pin = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return redirect("/office/login");
  const { user } = session;
  console.log(user);

  const res = await fetch(
    `${process.env.API}/user/staff/${user.id}/check-pin-state`,
    { next: { tags: ["pin-status"] } }
  );

  const data: APIResponseObject = await res.json();

  if (!data.success) throw new Error(data.message);

  return (
    <div className="flex justify-between">
      <p className="ml-4">******</p>
      {data.hasPin ? <ChangePin /> : <AddPin />}
    </div>
  );
};

export default Pin;
