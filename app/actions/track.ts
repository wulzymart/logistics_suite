'use server'

import { createAdminClient } from "@/lib/supabase"

export const track = async (trackingNumber: string) => {
    const supabase = await createAdminClient()
    const { data, error } = await supabase.from('order_info_view').select('*').eq('order_number', trackingNumber).single()
    if (error) return { success: false, error: error.message }
    return { success: true, data }
}
