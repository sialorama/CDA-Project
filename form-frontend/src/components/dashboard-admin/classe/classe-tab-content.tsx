import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {TabsContent} from "@/components/ui/tabs.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SquarePlus} from "lucide-react";
import {ColumnDef} from "@tanstack/react-table";
import DataTable from "@/components/data-table.tsx";
import {Path} from "@/types/Path.ts";
import NewClasseModal from "@/components/dashboard-admin/classe/new-classe-modal.tsx";

interface ClassesTabContentProps {
    columns: ColumnDef<Path>[],
    classes: Path[],
    isLoading: boolean,
    handleSuccess: (isSuccess: boolean) => void,
}

const ClassesTabContent: React.FC<ClassesTabContentProps> = ({
                                                                       columns,
                                                                       classes,
                                                                       isLoading,
                                                                       handleSuccess,
                                                                   }) => {
    return (
        <TabsContent value="classes" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Classes</CardTitle>
                    <CardDescription>Gérer les classes ici.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-2">
                        <NewClasseModal onSuccess={handleSuccess}>
                            <Button className="self-end">
                                <SquarePlus className="h-5 w-5"/>
                            </Button>
                        </NewClasseModal>
                    </div>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <DataTable  columns={columns} data={[...classes]} />
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default ClassesTabContent;
