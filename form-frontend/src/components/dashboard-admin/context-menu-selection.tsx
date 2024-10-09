import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {ReactNode} from "react";
import {Row} from "@tanstack/react-table";
import {useStore} from "@/store/use-store.ts";
import ConfirmModal from "@/components/modal/confirm-modal.tsx";

interface ContextMenuSelectionProps<TData, > {
    children?: ReactNode,
    isSelected?: boolean,
    selectedRows?: Row<TData>[],
    onAddToClass?: (rows: Row<TData>[]) => void,
    onDelete?: (rows: Row<TData>[]) => Promise<void>,
}

const ContextMenuSelection = <TData, >({
                                           children,
                                           isSelected,
                                           selectedRows,
                                           onAddToClass,
                                           onDelete,
                                       }: ContextMenuSelectionProps<TData>) => {

    const activeTab = useStore((state) => state.activeTab);


    return (
        <ContextMenu>
            <ContextMenuTrigger>
                {children}
            </ContextMenuTrigger>
            {isSelected ? (
                <ContextMenuContent className="w-64">
                    {activeTab === "candidate" && (
                        <ContextMenuItem
                            inset
                            onClick={() => onAddToClass && selectedRows && onAddToClass(selectedRows)}
                        >
                            Ajouter à une classe
                        </ContextMenuItem>
                    )}
                    <ConfirmModal
                                  onConfirm={() => selectedRows && onDelete && onDelete(selectedRows)}>
                        <ContextMenuItem
                            onSelect={(e) => e.preventDefault()}
                        >
                            Supprimé !
                        </ContextMenuItem>
                    </ConfirmModal>
                    <ContextMenuSeparator/>

                    <ContextMenuSeparator/>
                    {activeTab === "candidates" && (
                        // TODO: add handle status maybe later
                        <ContextMenuRadioGroup value="current">
                            <ContextMenuLabel inset>Status</ContextMenuLabel>
                            <ContextMenuSeparator/>

                            <ContextMenuRadioItem value="current">
                                En cours
                            </ContextMenuRadioItem>

                            <ContextMenuRadioItem value="archived">
                                Archivé
                            </ContextMenuRadioItem>
                            <ContextMenuRadioItem value="done">
                                Terminé
                            </ContextMenuRadioItem>
                        </ContextMenuRadioGroup>
                    )}
                </ContextMenuContent>
            ) : null}
        </ContextMenu>
    )
}

export default ContextMenuSelection;