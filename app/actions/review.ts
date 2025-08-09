'use server'

import { createAdminClient } from "@/lib/supabase"
import { Review } from "@/app/(website)/(routes)/(unprotected)/track/[num]/page"

export const review = async (reviewData: Omit<Review, 'id' | 'created_at'>) => {
    const supabase = await createAdminClient()
    const { data, error } = await supabase.from('reviews').insert(reviewData).select('*').single()
    if (error) return { success: false, error: error.message }
    return { success: true, data }
}

export const getReviews = async (orderId: string) => {
    const supabase = await createAdminClient()
    const { data, error } = await supabase.from('reviews').select('*').eq('order_id', orderId)
    if (error) return { success: false, error: error.message }
    return { success: true, data }
}
