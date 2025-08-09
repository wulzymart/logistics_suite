
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Package } from "lucide-react";
import { z } from "zod";
import { useStations } from "@/context/StationsContext";
import { useLocations } from "@/context/StatesContext";
import { submitPickupRequest } from "../(routes)/(unprotected)/pickup-request/action";
import { useToast } from "@/components/ui/use-toast";


export const pickupRequestSchema = z.object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(10, "Address must be at least 10 characters"),
    nearest_station_id: z.string().uuid("Please select a station"),
    order_description: z.string().min(10, "Provide a detailed order description"),
    estimated_weight: z.coerce.number().min(1, "Weight must be at least 1 kg"),
    state_id: z.number().min(1, "Please select origin state"),
    destination_state_id: z.number().min(1, "Please select destination state"),
    receiver_address: z.string().min(10, "Receiver address must be at least 10 characters"),
});

export type PickupRequestFormData = z.infer<typeof pickupRequestSchema>;

// types.ts
export interface State {
    id: string;
    name: string;
}

export interface Station {
    id: string;
    name: string;
    address: string;
    state_id: string;
}

export function PickupRequestForm() {
    const form = useForm<PickupRequestFormData>({
        resolver: zodResolver(pickupRequestSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            address: "",
            nearest_station_id: "",
            order_description: "",
            estimated_weight: 0,
            state_id: 0,
            destination_state_id: 0,
            receiver_address: "",
        },
    });
    const { stations } = useStations()
    const { getStates } = useLocations()
    const states = getStates()
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const selectedStateId = form.watch("state_id");
    const filteredStations = stations.filter(station => station.state_id === selectedStateId);

    // Reset station when state changes
    React.useEffect(() => {
        if (selectedStateId) {
            form.setValue("nearest_station_id", "");
        }
    }, [selectedStateId, form]);
    const { toast } = useToast()

    const handleSubmit = async (data: PickupRequestFormData) => {
        setIsSubmitting(true);
        try {
            const result = await submitPickupRequest(data);
            if (result.success) {
                form.reset();
                setIsSubmitting(false);
                toast({
                    title: "Success",
                    description: "Pickup request submitted successfully",
                })
            }
        } catch (error) {
            console.error("Form submission error:", error);
            toast({
                title: "Error",
                description: "Failed to submit pickup request",
                variant: "destructive",
            })
        }
    };

    return (
        <Card className="w-full w-[80%] mx-auto">
            <CardHeader className="space-y-1">
                <p className="text-muted-foreground">
                    Fill out the details for your package pickup request
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+234 xxx xxx xxxx" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john@example.com" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Pickup Location */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Pickup Location</h3>
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pickup Address</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter your full pickup address"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="state_id"

                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Origin State</FormLabel>
                                            <Select onValueChange={(value) => field.onChange(+value)} defaultValue={field.value?.toString()} value={field.value?.toString()}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select state" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {states.map((state) => (
                                                        <SelectItem key={state.id} value={"" + state.id}>
                                                            {state.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nearest_station_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nearest Station</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select station" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {filteredStations.map((station) => (
                                                        <SelectItem key={station.id} value={station.id}>
                                                            <p>{station.name}</p>
                                                            <p>{station.address}</p>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Package Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Package Information</h3>
                            <FormField
                                control={form.control}
                                name="order_description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Item Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe the items you want to send"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="estimated_weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estimated Weight (kg)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                min="1"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Destination */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Destination</h3>
                            <FormField
                                control={form.control}
                                name="destination_state_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Destination State</FormLabel>
                                        <Select onValueChange={(value) => field.onChange(+value)} defaultValue={field.value?.toString()} value={field.value?.toString()}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select destination state" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {states.map((state) => (
                                                    <SelectItem key={state.id} value={"" + state.id}>
                                                        {state.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="receiver_address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Receiver Address</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter the full delivery address"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Pickup Request"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
