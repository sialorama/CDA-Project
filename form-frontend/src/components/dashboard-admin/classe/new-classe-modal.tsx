import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import React, {useEffect, useState} from "react";
import z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import classeService from "@/service/classe.service.ts";
import formerService from "@/service/former.service.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Former} from "@/types/Former.ts";
import {Center} from "@/types/Center.ts";
import centerService from "@/service/center.service.ts";


interface NewClasseModalProps {
    children: React.ReactNode;
    onSuccess: (isSuccess: boolean) => void;
}


const ClasseSchema = z.object({
    center_id: z.string(),
    former_id: z.string(),
    date_start: z.string(),
    date_end: z.string()
});

const NewClasseModal = ({children, onSuccess}: NewClasseModalProps) => {
    const [formers, setFormer] = useState<Former[]>([]);
    const [centers, setCenters] = useState<Center[]>([]);

    const form = useForm<z.infer<typeof ClasseSchema>>({
        resolver: zodResolver(ClasseSchema),
        defaultValues: {
            center_id: "",
            former_id: "",
            date_start: "",
            date_end: "",
        },
    });


    const handleCreateClasse = async (data: z.infer<typeof ClasseSchema>) => {
        try {
            const formattedData = {
                ...data,
                date_start: new Date(data.date_start).getTime(),
                date_end: new Date(data.date_end).getTime(),
            };
            console.log(formattedData);
            await classeService.create(formattedData);
            onSuccess(true);
        } catch (error) {
            console.error(error);               
            onSuccess(false);
        }
    }

    const fetchCenters = async () => {
        const resp = await centerService.getAll();
        console.log("Centers response:", resp.data);
        setCenters(resp.data);
    }

    const fetchFormers = async () => {
        const resp = await formerService.getAll();
        console.log("Formers response:", resp.data);
        setFormer(resp.data);
    }

    useEffect(() => {
        fetchFormers();
        fetchCenters();
    }, []);



    return (
        <AlertDialog>
            <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Créer une nouvelle classe</AlertDialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreateClasse)} className=" flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="center_id"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Centre</FormLabel>
                                        <Select onValueChange={field.onChange}
                                                defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selectionner un centre"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {centers &&
                                                    centers.map((item) => (
                                                            <SelectItem key={item.id} value={item.id.toString()     }>
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="former_id"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Formateur</FormLabel>
                                        <Select  onValueChange={field.onChange}
                                                 defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selectionner un formateur"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className={"text-black"}>
                                                {formers &&     (
                                                    formers.map((item) => (
                                                        <SelectItem key={item.id}
                                                                    value={item.id.toString()}>{item.lastname}</SelectItem>
                                                    ))
                                                )
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date_start"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Date de début
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <FormField
                                control={form.control}
                                name="date_end"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Date de fin
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="date"  {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <AlertDialogFooter>
                                <AlertDialogAction type="submit">
                                    Créer une classe
                                </AlertDialogAction>
                                <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                                    Cancel
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );

}

export default NewClasseModal;