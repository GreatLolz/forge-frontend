import { Checkbox } from "@/components/ui/checkbox";
import { DATASET_TYPES, type Dataset } from "@/types/datasets";
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
        cell: ({row}) => DATASET_TYPES[row.original.type] || row.original.type
    },
    {
        accessorKey: "created_at",
        header: "Created at",
        cell: ({row}) => new Date(row.original.created_at).toLocaleString()
    },
    {
        accessorKey: "updated_at",
        header: "Updated at",
        cell: ({row}) => new Date(row.original.updated_at).toLocaleString()
    },
    {
        accessorKey: "sample_count",
        header: "Sample count",
        cell: ({row}) => row.original.sample_count === 0 ? "-" : row.original.sample_count
    },
]
