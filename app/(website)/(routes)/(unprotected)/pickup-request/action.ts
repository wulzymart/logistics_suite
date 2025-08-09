'use server'
import { pickupRequestSchema } from "@/app/(website)/_components/pickup-form";
import { createAdminClient } from "@/lib/supabase";
import { z } from "zod"

export async function submitPickupRequest(values: z.infer<typeof pickupRequestSchema>) {
    const supabase = await createAdminClient()
    const { data, error } = await supabase.from("pickup_requests").insert([
        {
            first_name: values.first_name,
            last_name: values.last_name,
            phone: values.phone,
            email: values.email,
            address: values.address,
            nearest_station_id: values.nearest_station_id,
            order_description: values.order_description,
            estimated_weight: values.estimated_weight,
            state_id: values.state_id,
            destination_state_id: values.destination_state_id,
            receiver_address: values.receiver_address,
        },
    ]).select("*").single()
    if (error) {
        console.error("Error submitting pickup request:", error)
        return { success: false, error: error.message }
    }
    // TODO: Send email to user
    return { success: true, data }
}
