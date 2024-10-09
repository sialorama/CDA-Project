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
import AuthService from "@/service/auth.service.ts";


interface NewFormerModalProps {
    children: React.ReactNode;
    onSuccess: (isSuccess: boolean) => void;
}


const RegisterSchema = z.object({
    firstname: z.string({
        required_error: "Please enter first name.",
    }),
    lastname: z.string({
        required_error: "Please enter last name.",
    }),
    email: z.string({
        required_error: "Please enter email.",
    }).email(),
    password: z.string({
        required_error: "Please enter password.",
    }),
    role: z.string({
        required_error: "Please select an role.",
    }),
    phone_number: z.string({
        required_error: "Please enter phone number valid.",
    }).max(10),
})

const NewFormerModal = ({children, onSuccess}: NewFormerModalProps) => {

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            phone_number: "",
            role: "FORMER",
        },
    });


    const handleCreateFormer = async (data: z.infer<typeof RegisterSchema>) => {
        try {
            console.log(data)
            await AuthService.signup(data);
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
                    <AlertDialogTitle>Créer un nouveau formateur</AlertDialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreateFormer)} className=" flex flex-col gap-2">
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

export default NewFormerModal;