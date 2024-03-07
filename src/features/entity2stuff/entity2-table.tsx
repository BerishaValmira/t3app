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
import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import UpdateEntity2Dialog from "./update-entity2-dialog";
import { useState } from "react";

export default function Entity2Table() {
  const [open, setOpen] = useState(false);

  const [id, setId] = useState<number>(0);

  const { data, isLoading, refetch } = api.base.getEntity2.useQuery();

  const { mutate: remove } = api.base.deleteEntity2.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const columns: ColumnDef<Entity2>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    // {
    //   accessorKey: "isPassed",
    //   header: "Is Passed",
    // },
    {
      accessorKey: "entity1Id",
      header: "PersonID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "type",
      header: "TYpe",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  remove(row.original.id);
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true);
                  setId(row.original.id);
                }}
              >
                update
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    // {
    //   accessorKey:'note',
    //   header:"Note"
    // }
  ];

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
        <UpdateEntity2Dialog open={open} setOpen={setOpen} selectedId={id} />
        <Input
          onChange={(value) => {
            mutate({ type: value.target.value });
          }}
        />
        {/* <Select
          onValueChange={(value) => {
            mutate({ type: value });
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
            {interviewOptions.map((x) => (
              <SelectItem value={`${x.id}`}>
                {`Interview nr. ${x.id}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
        <Button disabled={!isSuccess} onClick={() => reset()}>
          Remove filter
        </Button>
      </div>
      <div className="container mx-auto py-10">
        {isLoading && "Loading..."}
        {data && (
          // <DataTable columns={columns} data={isSuccess ? filteredData : data} />
          <DataTable columns={columns} data={isSuccess ? filteredData : data} />
        )}
      </div>
    </div>
  );
}
