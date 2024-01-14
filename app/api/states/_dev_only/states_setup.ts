import { db } from "@/lib/db";
import { statesArray } from "@/lib/states-lgas-stations";
import { NextResponse } from "next/server";

export async function GET() {
  type LGA = { name: String };
  const addStates = async () => {
    statesArray.forEach(async (state: any) => {
      const lgasArray: LGA[] = state.lgas.map((name: string) => {
        return { name };
      });
      await db.state.create({
        data: {
          name: state.name,
          code: state.code,
          capitalCity: state.capital,
          capitalCityCode: state.capitalCode,
          lat: +state.lat,
          long: +state.long,
          lgas: {
            createMany: { data: lgasArray as any },
          },
        },
      });
    });
  };

  await addStates();
  return NextResponse.json({ message: "Add states" });
}
