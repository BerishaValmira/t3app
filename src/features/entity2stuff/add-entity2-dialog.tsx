"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { insertEntity1Schema, insertEntity2Schema } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { useState } from "react";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { Matcher } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function AddEntity1Dialog() {
  const [open, setOpen] = useState(false);

  const { refetch } = api.base.getEntity2.useQuery();

  const { data: interviewOptions } = api.base.getEntity1.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const { mutate, data, isLoading } = api.base.addEntity2.useMutation({
    onSuccess:async () => {
      setOpen(false);
      await refetch();
    },
  });

  const form = useForm<z.infer<typeof insertEntity2Schema>>({
    resolver: zodResolver(insertEntity2Schema),
    defaultValues: {
      // isPassed: false,
      entity1Id: 0,
      // note:""
    },
  });

  function onSubmit(values: z.infer<typeof insertEntity2Schema>) {
    console.log(values);
    mutate(values);
  }

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger>
          <Button>Create Entity2</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create</DialogTitle>
            <DialogDescription>Fill the data to create</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 space-x-2">
            {/* <FormField
              control={form.control}
              name="isPassed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value ? field.value : undefined}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Is Passed
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='note'
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                   <Input {...field}/>
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Is Passed
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interviewId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("interviewId", Number(value));
                    }}
                    defaultValue={"0"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an interview" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {interviewOptions
                        ?.filter((x) => !x.isDeleted)
                        .map((x) => (
                          <SelectItem value={`${x.id}`}>
                            {`Interview nr. ${x.id}`}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
