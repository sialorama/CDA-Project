import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuTrigger} from "./ui/dropdown-menu";
import {DropdownMenuContent} from "@radix-ui/react-dropdown-menu";
import ContextMenuSelection from "@/components/dashboard-admin/context-menu-selection.tsx";
import candidateService from "@/service/candidate.service.ts";
import {toast} from "sonner";


interface DataTableProps<TData extends {id:string}, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
}

interface ColumnMetaWithDisplayName {
    displayName?: string;
}

function DataTable<TData extends { id: string; }, TValue>({columns, data}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({})
    const [items,setItems] = useState<TData[]>(data);


    const table = useReactTable({
        data: items,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnVisibility,
            rowSelection
        },
    })

    const isRowSelected = Object.keys(rowSelection).length > 0;

    const selectedRows: Row<TData>[] = table.getSelectedRowModel().rows as Row<TData>[];

    const handleAddToClass = (rows: Row<TData>[]) => {
        console.log("Ajouter à une classe", rows);
    }


    const handleDelete = async (rows: Row<TData>[]) => {

        const idsToDelete = rows.map((row) => row.original.id);

        try {
            await Promise.all(
                idsToDelete.map(async (id) => {
                    await candidateService.delete(id);
                })
            );

            const updatedCandidates = items.filter((candidate) => !idsToDelete.includes(candidate .id));

            setItems(updatedCandidates);

            toast.success("Candidats supprimés avec succès.");
        } catch (err) {
            toast.error("Erreur lors de la suppression des candidats.");
            console.error("Erreur API " + err);
        }
    }


    useEffect(() => {
        setItems(data);
    }, [data]);

    return (
        <ContextMenuSelection
            isSelected={isRowSelected}
            onAddToClass={handleAddToClass}
            onDelete={handleDelete}
            selectedRows={selectedRows}
        >
            <div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex-1 mt-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} /{" "}
                    {table.getFilteredRowModel().rows.length} ligne(s) selectionné.
                </div>
                <div className="flex items-center justify-between py-4">
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Colonnes visibles
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-secondary p-1 mb-0.5 shadow rounded" align="end">
                                {table
                                    .getAllColumns()
                                    .filter(
                                        (column) => column.getCanHide()
                                    )
                                    .map((column) => {
                                        const meta = column.columnDef.meta as ColumnMetaWithDisplayName | undefined
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {meta?.displayName || column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex items-center justify-between space-x-2 py-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </ContextMenuSelection>
    )
};

export default DataTable;
