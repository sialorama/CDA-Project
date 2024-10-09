import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { TabsContent } from "@/components/ui/tabs.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SquarePlus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/data-table.tsx";
import { Center } from "@/types/Center.ts";
import NewCenterModal from "@/components/dashboard-admin/center/new-center-modal.tsx";

interface CenterTabContentProps {
    columns: ColumnDef<Center>[],
    centers: Center[],
    isLoading: boolean,
    handleSuccess: (isSuccess: boolean) => void,
}

const CenterTabContent: React.FC<CenterTabContentProps> = ({
    columns,
    centers,
    isLoading,
    handleSuccess,
}) => {
    return (
        <TabsContent value="centers" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Centre AFPA</CardTitle>
                    <CardDescription>Gérer les centres ici.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-2">
                        <NewCenterModal onSuccess={handleSuccess}>
                            <Button className="self-end">
                                <SquarePlus className="h-5 w-5" />
                            </Button>
                        </NewCenterModal>
                    </div>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <DataTable columns={columns} data={[...centers]} />
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default CenterTabContent;
