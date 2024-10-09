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
import {Former} from "@/types/Former.ts";
import formerService from "@/service/former.service.ts"; // Pour les notifications

interface FormerColumnsProps {
    formers: Former[];
    setFormers: React.Dispatch<React.SetStateAction<Former[]>>;
}

export const GetFormerColumns = ({formers, setFormers}: FormerColumnsProps): ColumnDef<Former>[]  => {

    const onCopy = (email: string) => {
        navigator.clipboard.writeText(email);
        toast.success("Email copié dans le presse-papier !");
    };

    const deleteFormer = async (id: string) => {
        try {
            await formerService.delete(id);
            setFormers(formers.filter((former) => former.id !== id));
            toast.success(`Formateur ${id} supprimé avec succès.`);
        } catch (err) {
            toast.error("Erreur lors de la suppression du formateur");
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
            header: "Numéro de formateur",
            meta: {
                displayName: "Id"
            }
        },
        {
            accessorKey: "firstname",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Prénom
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            meta: {
                displayName: "Prénom"
            }
        },
        {
            accessorKey: "lastname",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nom
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            meta: {
                displayName: "Nom"
            }
        },
        {
            accessorKey: "email",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            meta: {
                displayName: "Email"
            }
        },
        {
            accessorKey: "phone_number",
            header: "Téléphone",
            meta: {
                displayName: "Téléphone",
            }
        },
        {
            id: "actions",
            cell: ({row}) => {
                const former = row.original;

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
                            <DropdownMenuItem onClick={() => onCopy(former.email)}>
                                Copy email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            {/*TODO: ajouter page former details*/}
                            <DropdownMenuItem onClick={() => navigate(`/former/details/${former.id}`)}>
                                Détails formateur
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-red-400 bg-red-100 cursor-pointer"
                            >
                                <ConfirmModal onConfirm={() => deleteFormer(former.id)}>
                                    <span>Supprimer le formateur</span>
                                </ConfirmModal>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
};
