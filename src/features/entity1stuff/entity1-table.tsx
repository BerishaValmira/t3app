"use client";

import { DataTable } from "~/components/ui/data-table";
import AddEntity1Dialog from "./add-entity1-dialog";
import { api } from "~/trpc/react";
import { ColumnDef } from "@tanstack/react-table";
import { Entity1 } from "~/server/db/schema";
import FilterByDate from "./filter-by-date";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon, MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function Entity1Table() {
  const [date, setDate] = useState<Date>(new Date(Date.now()));

  const { data, isLoading, refetch } = api.base.getEntity1.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  // const { mutate: remove } = api.base.deleteEntity1.useMutation({
  //   onSuccess: () => refetch(),
  // });

  // const {
  //   mutate,
  //   data: filteredData,
  //   isSuccess,
  //   reset,
  // } = api.base.filterEntity1.useMutation({});

  const columns: ColumnDef<Entity1>[] = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: "Name",
      },
      // {
      //   accessorKey: "isDeleted",
      //   header: "Is Deleted",
      // },
      // {
      //   accessorKey: "startDate",
      //   header: "Start Date",
      //   cell: ({ row }) => {
      //     const val = row.original.startDate?.toString();
      //     console.log(val);
      //     return <div>{val}</div>;
      //   },
      // },
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
                    // remove(row.original.id);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  }, []);

  return (
    <div className="flex flex-col ">
      <div className="flex justify-center gap-4">
        <AddEntity1Dialog />
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                date && setDate(date);
                // date && mutate({ date: date.toISOString() });
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover> */}
        {/* <Button disabled={!isSuccess} onClick={() => reset()}>
          Remove filter
        </Button> */}
      </div>
      <div className="container mx-auto py-10">
        {isLoading && "Loading..."}
        {data && (
          <DataTable columns={columns} data={data} />
          // <DataTable
          //   columns={columns}
          //   data={isSuccess ? filteredData : data}
          // />
        )}
      </div>
    </div>
  );
}

//test comment
