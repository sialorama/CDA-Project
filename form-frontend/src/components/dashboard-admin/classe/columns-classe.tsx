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
import {Path} from "@/types/Path.ts";
import classeService from "@/service/classe.service.ts";

interface ClasseColumnsProps {
    classes: Path[];
    setClasses: React.Dispatch<React.SetStateAction<Path[]>>;
}

export const GetClassesColumns = ({classes, setClasses}: ClasseColumnsProps): ColumnDef<Path>[]  => {

    const deleteClasse = async (id: string | undefined) => {
        if (!id) return;
        try {
            await classeService.delete(id);
            setClasses(classes.filter((classe) => classe.id !== id));
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
            header: "Numéro de classe",
            meta: {
                displayName: "Id"
            }
        },
        {
            accessorKey: "center",
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
                displayName: "Centre"
            }
        },
        {
            accessorKey: "former",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Formateur
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            meta: {
                displayName: "Formateur"
            }
        },
        {
            accessorKey: "date_start",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Début
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            meta: {
                displayName: "Date début"
            }
        },
        {
            accessorKey: "date_end",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Fin
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            meta: {
                displayName: "Date fin",
            }
        },
        {
            id: "actions",
            cell: ({row}) => {
                const classe = row.original;

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
                            <DropdownMenuItem onClick={() => navigate(`/classes/details/${classe.id}`)}>
                                Détails classe
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-red-400 bg-red-100 cursor-pointer"
                            >
                                <ConfirmModal onConfirm={() => deleteClasse(classe.id)}>
                                    <span>Supprimer la classe</span>
                                </ConfirmModal>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
};
