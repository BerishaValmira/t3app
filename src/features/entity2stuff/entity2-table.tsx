"use client";

import { DataTable } from "~/components/ui/data-table";
import AddEntity2Dialog from "./add-entity2-dialog";
import { api } from "~/trpc/react";
import { ColumnDef } from "@tanstack/react-table";
import { Entity2 } from "~/server/db/schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { FormControl } from "~/components/ui/form";

export const columns: ColumnDef<Entity2>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "isPassed",
    header: "Is Passed",
  },
  {
    accessorKey: "interviewId",
    header: "InterviewId",
  },
  {
    accessorKey:'note',
    header:"Note"
  }
];

export default function Entity2Table() {
  const { data, isLoading } = api.base.getEntity2.useQuery();

  const { data: interviewOptions } = api.base.getEntity1.useQuery();

  const {
    mutate,
    data: filteredData,
    isSuccess,
    reset,
  } = api.base.filterEntity2.useMutation();

  return (
    <div className="flex flex-col ">
      <div className="flex justify-center gap-4">
        <AddEntity2Dialog />
        <Select
          onValueChange={(value) => {
            mutate({ interviewId: Number(value) });
          }}
          defaultValue={"0"}
        >
          <SelectTrigger className="w-[180px] text-primary">
            <SelectValue
              placeholder="Select an interview"
              className="text-primary"
            />
          </SelectTrigger>
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
        <Button disabled={!isSuccess} onClick={() => reset()}>
          Remove filter
        </Button>
      </div>
      <div className="container mx-auto py-10">
        {isLoading && "Loading..."}
        {data && (
          <DataTable columns={columns} data={isSuccess ? filteredData : data} />
        )}
      </div>
    </div>
  );
}
