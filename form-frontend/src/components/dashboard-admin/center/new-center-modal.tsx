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
import React from "react";
import z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

import centerService from "@/service/center.service.ts";


interface NewCenterModalProps {
    children: React.ReactNode;
    onSuccess: (isSuccess: boolean) => void;
}


const CenterSchema = z.object({
    name: z.string(),
    address: z.string(),
    phone_number: z.string(),
})

const NewCenterModal = ({children, onSuccess}: NewCenterModalProps) => {

    const form = useForm<z.infer<typeof CenterSchema>>({
        resolver: zodResolver(CenterSchema),
        defaultValues: {
            name: "",
            address: "",
            phone_number: "",
        },
    });


    const handleCreateCenter = async (data: z.infer<typeof CenterSchema>) => {
        try {
            console.log(data)
            await centerService.create(data);
            onSuccess(true);
        } catch (error) {
            console.error(error);
            onSuccess(false);
        }
    }



    return (
        <AlertDialog>
            <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Créer un nouveau centre</AlertDialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreateCenter)} className=" flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Nom du centre
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <FormField
                                control={form.control}
                                name="address"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Adresse postale
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="text"  {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Téléphone
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="text"  {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <AlertDialogFooter>
                                <AlertDialogAction type="submit">
                                    Créer un centre
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

export default NewCenterModal;