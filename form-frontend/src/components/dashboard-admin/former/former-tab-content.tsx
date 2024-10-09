import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {TabsContent} from "@/components/ui/tabs.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SquarePlus} from "lucide-react";
import {useState} from "react";
import {ColumnDef} from "@tanstack/react-table";
import DataTable from "@/components/data-table.tsx";
import {Former} from "@/types/Former.ts";
import NewFormerModal from "@/components/dashboard-admin/former/new-former-modal.tsx";

interface CandidatesTabContentProps {
    columns: ColumnDef<Former>[],
    formers: Former[],
    isLoading: boolean,
    handleSuccess: (isSuccess: boolean) => void,
}

const FormersTabContent: React.FC<CandidatesTabContentProps> = ({
                                                                       columns,
                                                                       formers,
                                                                       isLoading,
                                                                       handleSuccess,
                                                                   }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredFormers = formers.filter((former) =>
        `${former.firstname} ${former.lastname}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <TabsContent value="formers" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Formateurs</CardTitle>
                    <CardDescription>Gérer les formateurs ici.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-2">
                        <div>
                            <Label htmlFor="search-users">Rechercher un formateur</Label>
                            <Input
                                id="search-users"
                                placeholder="Par nom..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <NewFormerModal onSuccess={handleSuccess}>
                            <Button className="self-end">
                                <SquarePlus className="h-5 w-5"/>
                            </Button>
                        </NewFormerModal>
                    </div>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <DataTable key={filteredFormers.length} columns={columns} data={[...filteredFormers]} />
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default FormersTabContent;
