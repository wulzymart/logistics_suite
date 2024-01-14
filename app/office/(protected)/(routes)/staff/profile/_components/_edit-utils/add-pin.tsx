"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormInput from "@/components/form-input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useToast } from "@/components/ui/use-toast";
import { startTransition } from "react";
import { addPin } from "@/lib/actions";
import { APIResponseObject } from "@/types";
const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be minimum of 6 characters" }),
    pin: z
      .string()
      .length(4, { message: "Pin must be 4 digits" })
      .regex(/^\d+$/, { message: "Pin must only be digits" }),
    confirmPin: z
      .string()
      .length(4, { message: "Pin must be 4 digits" })
      .regex(/^\d+$/, { message: "Pin must only be digits" }),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "Pins dont match",
    path: ["confirmPin"],
  });

const AddPin = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      pin: "",
      confirmPin: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      addPin(values).then((data: APIResponseObject) => {
        if (data.success) {
          form.reset();
          document.getElementById("closeDialog")?.click();
          toast({
            description: data.message,
          });
        } else {
          toast({ variant: "destructive", description: data.message });
        }
      });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Add
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[425px] md:max-w-[600px] px-12 py-10"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Change Pin</DialogTitle>
              <DialogDescription>Add your pin here</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mb-6">
              <FormInput
                control={form.control}
                name="pin"
                label="Pin"
                type="password"
                placeholder="e.g 1234"
              />
              <FormInput
                control={form.control}
                name="confirmPin"
                label="Confirm Pin"
                type="password"
                placeholder="eg. 1234"
              />
              <FormInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Your password"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add Pin</Button>
              <DialogClose id="closeDialog" />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPin;
