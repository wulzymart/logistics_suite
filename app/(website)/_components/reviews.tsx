import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Review } from "../(routes)/(unprotected)/track/[num]/page"
import { Star } from "lucide-react"
export function ReviewsComponent({ reviews }: { reviews: Review[] }) {
    if (!reviews || reviews.length === 0) return <></>
    return (
        <div className="w-screen bg-black pb-16">
            <div className="container mx-auto">
                <h2 className="text-3xl text-center font-bold mb-4 text-gray-200 py-8">Reviews</h2>
                <Carousel className="w-full">
                    <CarouselContent>
                        {reviews.map((review, index) => (
                            <CarouselItem key={index} className="h-full">
                                <Card className="h-full">
                                    <CardContent className="flex flex-col items-center justify-center p-6 h-[500px]">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-5 h-5 text-yellow-400" />
                                            <span className="text-lg font-semibold">{review.rating}</span>
                                        </div>
                                        <p className="text-gray-700 text-center text-lg py-2 italic font-medium">{review.feedback.charAt(0).toUpperCase() + review.feedback.slice(1)}</p>
                                        <p className="text-sm text-gray-500 text-center">{review.reviewer_name}</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {reviews.length > 1 && <CarouselPrevious />}
                    {reviews.length > 1 && <CarouselNext />}
                </Carousel>
            </div>

        </div>
    )
}
