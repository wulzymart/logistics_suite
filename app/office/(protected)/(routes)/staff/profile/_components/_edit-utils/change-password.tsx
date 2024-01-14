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
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormInput from "@/components/form-input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useToast } from "@/components/ui/use-toast";
import { startTransition } from "react";
import { changePassword } from "../../../../../../../../lib/actions";
import { APIResponseObject } from "@/types";
const formSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "Password must be minimum of 6 characters" }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be minimum of 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be minimum of 6 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords dont match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from the old",
    path: ["newPassword"],
  });

const ChangePassword = () => {
  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      changePassword(values).then((data: APIResponseObject) => {
        if (data.success) {
          form.reset();
          document.getElementById("closeDialog")?.click();
          toast({
            description: data.message,
          });
        } else {
          toast({
            variant: "destructive",
            description: data.message,
          });
        }
      });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Change
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
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Make changes to your password here
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mb-6">
              <FormInput
                control={form.control}
                name="oldPassword"
                label="Old Password"
                type="password"
                placeholder=""
              />
              <FormInput
                control={form.control}
                name="newPassword"
                label="New Password"
                type="password"
                placeholder=""
              />
              <FormInput
                control={form.control}
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                placeholder=""
              />
            </div>
            <DialogFooter>
              <Button type="submit">Change Password</Button>
              <DialogClose id="closeDialog" />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
