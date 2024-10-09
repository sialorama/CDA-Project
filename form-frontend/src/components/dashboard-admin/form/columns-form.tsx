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
import {Form} from "@/types/Form.ts";
import formService from "@/service/form.service.ts"; // Pour les notifications

interface FormColumnsProps {
    forms: Form[];
    setForms: React.Dispatch<React.SetStateAction<Form[]>>;
}

export const GetFormColumns = ({forms, setForms}: FormColumnsProps): ColumnDef<Form>[]  => {

    const onCopy = (email: string) => {
        navigator.clipboard.writeText(email);
        toast.success("Titre copié dans le presse-papier !");
    };

    const deleteForm = async (id: string) => {
        try {
            await formService.delete(id);
            setForms(forms.filter((form) => form.id !== id));
            toast.success(`Formulaire ${id} supprimé avec succès.`);
        } catch (err) {
            toast.error("Erreur lors de la suppression du formulaire");
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
            header: "Numéro de formulaire",
            meta: {
                displayName: "Id"
            }
        },
        {
            accessorKey: "title",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Title
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            meta: {
                displayName: "Titre"
            }
        },
        {
            accessorKey: "description",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Description
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            meta: {
                displayName: "Description"
            }
        },
        {
            accessorKey: "isTemplate",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Template
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            meta: {
                displayName: "Template"
            }
        },
        {
            accessorKey: "former",
            header: "formateur",
            meta: {
                displayName: "formateur",
            }
        },
        {
            id: "actions",
            cell: ({row}) => {
                const form = row.original;

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
                            <DropdownMenuItem onClick={() => onCopy(form.title)}>
                                Copy du titre
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={() => navigate(`/forms/details/${form.id}`)}>
                                Détails du formulaire
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-red-400 bg-red-100 cursor-pointer"
                            >
                                <ConfirmModal onConfirm={() => deleteForm(form.id)}>
                                    <span>Supprimer le formulaire</span>
                                </ConfirmModal>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
};
