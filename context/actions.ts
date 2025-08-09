"use server";
import { createAdminClient } from "@/lib/supabase";

export async function getStations() {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
        .from("stations")
        .select("*, state:state_id(name), city:city_id(name)");
    if (error) {
        return {
            success: false,
            error: error.message || "Something went wrong",
        };
    }
    return { success: true, data };
}
export async function getStatesAndCities() {
    const supabase = await createAdminClient();
    const { data, error } = await supabase.from("states").select("*, cities(*)");

    if (error || !data) {
        console.log(error);

        return {
            success: false,
            error: error?.message || "Something went wrong",
        };
    }
    return {
        success: true,
        states: data,
    };
}
