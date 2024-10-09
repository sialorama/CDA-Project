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
import formService from "@/service/form.service.ts";


interface NewFormModalProps {
    children: React.ReactNode;
    onSuccess: (isSuccess: boolean) => void;
}

//TODO: schema of form
const FormSchema = z.object({

})

const NewFormModal = ({children, onSuccess}: NewFormModalProps) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
//TODO: default value for form
        },
    });


    const handleCreateCandidate = async (data: z.infer<typeof FormSchema>) => {
        try {
            console.log(data)
            // ! fix data type
            await formService.create(data);
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
                    <AlertDialogTitle>Créer un nouveau formulaire</AlertDialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreateCandidate)} className=" flex flex-col gap-2">
                            {/*! change to match with schema */}
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Prénom
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Nom
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="m@exemple.com" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Mot de passe
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="password"  {...field} />
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
                                            Numéro de téléphone
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <AlertDialogFooter>
                                <AlertDialogAction type="submit">
                                    Créer un compte
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

export default NewFormModal;