"use client";
import * as z from "zod";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC = () => {
  const origin = useOrigin();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
      </div>
      <Separator />
      <Form {...form}>
        <ApiAlert
          title="NEXT_PUBLIC_API_URL"
          description={`${origin}/api`} // No `storeId` in the URL
          variant="public"
        />
      </Form>
    </>
  );
};
