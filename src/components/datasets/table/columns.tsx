import { Checkbox } from "@/components/ui/checkbox";
import type { Dataset } from "@/types/datasets";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Dataset>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="inline-flex"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="inline-flex"
          />
        ),
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "created_at",
        header: "Created at",
    },
    {
        accessorKey: "updated_at",
        header: "Updated at",
    },
    {
        accessorKey: "sample_count",
        header: "Sample count",
    },
]
