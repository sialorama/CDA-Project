import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {toast} from "sonner";
import ConfirmModal from "@/components/modal/confirm-modal.tsx";
import {useNavigate} from "react-router-dom";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Center} from "@/types/Center.ts";
import centerService from "@/service/center.service.ts";

interface CentersColumnsProps {
    centers: Center[];
    setCenters: React.Dispatch<React.SetStateAction<Center[]>>;
}

export const GetCentersColumns = ({centers, setCenters}: CentersColumnsProps): ColumnDef<Center>[]  => {

    const deleteCenter = async (id: string | undefined) => {
        if (!id) return;
        try {
            await centerService.delete(id);
            setCenters(centers.filter((center) => center.id !== id));
            toast.success(`Classe ${id} supprimé avec succès.`);
        } catch (err) {
            toast.error("Erreur lors de la suppression de la classe");
            console.error("Erreur API " + err);
        }
    };

    const navigate = useNavigate();

    return [
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
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "Numéro de centre",
            meta: {
                displayName: "Id"
            }
        },
        {
            accessorKey: "name",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Centre
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            meta: {
                displayName: "Nom"
            }
        },
        {
            accessorKey: "address",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Adresse
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            meta: {
                displayName: "adresse"
            }
        },
        {
            accessorKey: "phone_number",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Téléphone
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            meta: {
                displayName: "téléphone"
            }
        },
        {
            id: "actions",
            cell: ({row}) => {
                const center = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            {/*TODO: ajouter page former details*/}
                            <DropdownMenuItem onClick={() => navigate(`/centers/details/${center.id}`)}>
                                Détails centre
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-red-400 bg-red-100 cursor-pointer"
                            >
                                <ConfirmModal onConfirm={() => deleteCenter(center.id)}>
                                    <span>Supprimer le centre</span>
                                </ConfirmModal>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
};
