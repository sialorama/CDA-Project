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
import candidateService from "@/service/candidate.service.ts";
import {toast} from "sonner";
import {Candidate} from "@/types/Candidate.ts";
import ConfirmModal from "@/components/modal/confirm-modal.tsx";
import {useNavigate} from "react-router-dom";
import {Checkbox} from "@/components/ui/checkbox.tsx"; // Pour les notifications

interface CandidateColumnsProps {
    candidates: Candidate[];
    setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
}

export const GetCandidateColumns = ({candidates, setCandidates}: CandidateColumnsProps): ColumnDef<Candidate>[]  => {

    const onCopy = (email: string) => {
        navigator.clipboard.writeText(email);
        toast.success("Email copié dans le presse-papier !");
    };

    const deleteCandidate = async (id: string) => {
        try {
            await candidateService.delete(id);
            setCandidates(candidates.filter((candidate) => candidate.id !== id));
            toast.success(`Candidat ${id} supprimé avec succès.`);
        } catch (err) {
            toast.error("Erreur lors de la suppression du candidat");
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
            header: "Numéro de candidat",
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
                const candidate = row.original;

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
                            <DropdownMenuItem onClick={() => onCopy(candidate.email)}>
                                Copy email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={() => navigate(`/candidate/details/${candidate.id}`)}>
                                Détails candidat
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-red-400 bg-red-100 cursor-pointer"
                            >
                                <ConfirmModal onConfirm={() => deleteCandidate(candidate.id)}>
                                    <span>Supprimer le candidat</span>
                                </ConfirmModal>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
};
