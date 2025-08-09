'use client'
import React, { useEffect, useState } from 'react';
import { Package, MapPin, Phone, User, Calendar, Weight, FileText, CheckCircle, Send, Star, MessageSquare } from 'lucide-react';
import { useParams } from 'next/navigation';
import { track } from '@/app/actions/track';
import { getReviews, review } from '@/app/actions/review';
interface TrackingInfo {
    id: string;
    created_at: string;
    info: string;
}

interface Item {
    quantity: number;
    weight: number;
    description: string;
    value: number | null;
}

interface OrderData {
    order_id: string;
    order_number: string;
    customer_name: string;
    customer_phone: string;
    receiver_name: string;
    receiver_phone: string;
    items: Item[];
    tracking_info_history: TrackingInfo[];
    origin_state: string;
    origin_city: string;
    destination_state: string;
    destination_city: string;
    destination_address: string;
    order_type: string;
    delivery_type: string;
    status: string;
}
export interface Review {
    id: string;
    reviewer: 'sender' | 'receiver';
    rating: number;
    feedback: string;
    created_at: string;
    reviewer_name: string;
    order_id: string;
}


const OrderTrackingPage: React.FC = () => {
    const { num } = useParams()
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [userType, setUserType] = useState<'sender' | 'receiver' | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState<OrderData | null>(null);

    const fetchOrderData = async () => {
        setLoading(true);
        const { data, error } = await track(num as string);
        if (error) {
            console.error('Error fetching order data:', error);
            return;
        }
        setOrderData(data);
        setLoading(false);
    };
    useEffect(() => {
        fetchOrderData();
    }, [num]);
    const fetchReviews = async () => {
        if (!orderData) return;
        const { data, error } = await getReviews(orderData?.order_id as string);
        if (error || !data) {
            console.error('Error fetching reviews:', error);
            return;
        }
        setReviews(data);
    };
    useEffect(() => {
        fetchReviews();
    }, [orderData]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!orderData) {
        return <div>Order not found</div>;
    }
    const hasReviewed = reviews.some(review => review.reviewer === userType);


    const handleSubmit = async () => {
        if (!userType || rating === 0 || !feedback.trim()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        const { success, error } = await review({
            reviewer: userType,
            rating,
            feedback: feedback.trim(),
            reviewer_name: orderData.customer_name,
            order_id: orderData.order_id,
        })

        if (!success) {
            throw new Error(error || 'Failed to submit review');
        }

        setIsSubmitting(false);
        setIsSubmitted(true);
        await fetchOrderData();
        setIsSubmitted(false);
        setRating(0);
        setFeedback('');

    };

    const isFormValid = userType && rating > 0 && feedback.trim().length > 0;



    if (isSubmitted) {
        return (
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border p-8">
                <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Thank you for your review!</h2>
                    <p className="text-gray-600">Your feedback helps us improve our service.</p>
                </div>
            </div>
        );
    }




    const handlePhoneVerification = () => {
        setError('');

        if (!phoneNumber.trim()) {
            setError('Please enter a phone number');
            return;
        }

        if (phoneNumber === orderData.customer_phone) {
            setIsVerified(true);
            setUserType('sender');
        } else if (phoneNumber === orderData.receiver_phone) {
            setIsVerified(true);
            setUserType('receiver');
        } else {
            setError('Phone number not associated with this order');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'in_transit':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const latestTracking = orderData.tracking_info_history[orderData.tracking_info_history.length - 1];

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
                    <p className="text-gray-600">Enter your phone number to view order details</p>
                </div>

                {/* Basic Order Info - Always Visible */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Order #{orderData.order_number}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(orderData.status)}`}>
                            {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">From</p>
                                <p className="font-medium">{orderData.origin_city}, {orderData.origin_state}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">To</p>
                                <p className="font-medium">{orderData.destination_city}, {orderData.destination_state}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-sm text-gray-500 mb-1">Latest Update</p>
                        <p className="font-medium">{latestTracking.info}</p>
                        <p className="text-sm text-gray-400 mt-1">{formatDate(latestTracking.created_at)}</p>
                    </div>
                </div>

                {!isVerified ? (
                    /* Phone Verification Form */
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="text-center mb-6">
                            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Identity</h3>
                            <p className="text-gray-600">Enter your phone number to view full order details</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="+234xxxxxxxxxx"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                />
                            </div>

                            {error && (
                                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handlePhoneVerification}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                            >
                                Verify & View Details
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Full Order Details - After Verification */
                    <div className="space-y-6">
                        {/* User Info */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Participants</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <User className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Sender</p>
                                            <p className="font-medium">{orderData.customer_name}</p>
                                            <p className="text-sm text-gray-600">{orderData.customer_phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <User className="w-5 h-5 text-green-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Receiver</p>
                                            <p className="font-medium">{orderData.receiver_name}</p>
                                            <p className="text-sm text-gray-600">{orderData.receiver_phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Package Details */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
                            <div className="space-y-4">
                                {orderData.items.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <FileText className="w-6 h-6 text-gray-400" />
                                        <div className="flex-1">
                                            <p className="font-medium">{item.description}</p>
                                            <div className="flex space-x-4 text-sm text-gray-600 mt-1">
                                                <span className="flex items-center space-x-1">
                                                    <span>Qty:</span>
                                                    <span>{item.quantity}</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <Weight className="w-4 h-4" />
                                                    <span>{item.weight}kg</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Delivery Information */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Delivery Type</p>
                                    <p className="font-medium capitalize">{orderData.delivery_type.replace('_', ' ')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Destination Address</p>
                                    <p className="font-medium">{orderData.destination_address}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Order Type</p>
                                    <p className="font-medium capitalize">{orderData.order_type}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tracking History */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking History</h3>
                            <div className="space-y-4">
                                {orderData.tracking_info_history.map((tracking, index) => (
                                    <div key={tracking.id} className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                                            {index < orderData.tracking_info_history.length - 1 && (
                                                <div className="w-px h-6 bg-gray-200 ml-1 mt-1"></div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">{tracking.info}</p>
                                            <p className="text-sm text-gray-500 flex items-center space-x-1 mt-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(tracking.created_at)}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mx-auto bg-white rounded-lg shadow-sm border">
                            <div className="p-6">
                                <div className="text-center mb-6">
                                    <MessageSquare className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Rate Your Experience</h2>
                                    <p className="text-gray-600 text-sm">Help us improve by sharing your feedback</p>
                                </div>

                                {/* Reviews Display */}
                                {hasReviewed ? (
                                    <div className="text-center py-8">
                                        <div className="bg-green-50 rounded-lg p-6">
                                            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Order Reviewed</h3>
                                            <p className="text-gray-600 text-sm">
                                                You have already submitted your review for this order.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">


                                        {/* Rating Selection */}
                                        {userType && (
                                            <div className="space-y-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Rate your experience (1-10)
                                                </label>
                                                <div className="flex items-center justify-center space-x-1 py-2">
                                                    {[...Array(10)].map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onMouseEnter={() => setHoveredRating(index + 1)}
                                                            onMouseLeave={() => setHoveredRating(0)}
                                                            onClick={() => setRating(index + 1)}
                                                            className="transition-transform hover:scale-110 focus:outline-none"
                                                        >
                                                            <Star
                                                                className={`w-6 h-6 ${index < (hoveredRating || rating)
                                                                    ? 'text-yellow-400 fill-current'
                                                                    : 'text-gray-300'
                                                                    }`}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                                {rating > 0 && (
                                                    <div className="text-center">
                                                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                            {rating}/10
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Feedback Text Area */}
                                        {userType && rating > 0 && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Share your feedback
                                                </label>
                                                <textarea
                                                    value={feedback}
                                                    onChange={(e) => setFeedback(e.target.value)}
                                                    placeholder="Tell us about your experience with this delivery..."
                                                    rows={4}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                                                    maxLength={500}
                                                />
                                                <div className="text-right mt-1">
                                                    <span className="text-xs text-gray-500">
                                                        {feedback.length}/500 characters
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        {userType && (
                                            <button
                                                onClick={handleSubmit}
                                                disabled={!isFormValid || isSubmitting}
                                                className={`
                  w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2
                  ${isFormValid && !isSubmitting
                                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                    }
                `}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
                                                        <span>Submitting...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4" />
                                                        <span>Submit Review</span>
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>



                    </div>
                )}
            </div>

        </div>
    );
};

export default OrderTrackingPage;
