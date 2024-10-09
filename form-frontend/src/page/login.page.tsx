import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import LoginImg from "../../public/loginImg.jpg"
import Logo from "@/components/logo"
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useStore} from "@/store/use-store.ts";
import {useNavigate} from "react-router-dom";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import AuthService from "@/service/auth.service.ts";
import {toast} from "sonner"
import {Toaster} from "@/components/ui/sonner.tsx";
import {Role} from "@/types/Role.ts";

const LoginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email(),
    password: z.string(),
})

export const LoginPage = () => {
    //TODO: add event to login and redirect
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    //TODO: add verif isConnected before & redirect to home if connected

    const setToken = useStore((state) => state.setToken);
    const setId = useStore((state) => state.setId);
    const setRole = useStore((state) => state.setRole);


    const navigate = useNavigate();

    const handleRedirect = ({id, role}: { id: number, role: Role }) => {
        switch (role) {
            case Role.ADMIN:
                navigate(`/admin`);
                break;
            case Role.FORMER:
                navigate(`/former/${id}`)
                break;
            case Role.CANDIDATE:
                navigate(`/candidate/${id}`)
                break;
            default:
                throw new Error("Role undefined")
        }
    }

    const handleLogin = async (data: z.infer<typeof LoginSchema>) => {

        try {
            const response = await AuthService.login(data);

            console.log(response)

            if (response.data.token && response.data.id && response.data.role) {
                setToken(response.data.token);
                setId(response.data.id)
                setRole(response.data.role)
                toast.success("Logged in successfully.");
            }

            setTimeout(() => handleRedirect({id: response.data.id, role: response.data.role}), 1000)
        } catch (error) {
            toast.error("Failed to login. " + error);
        }

    }


    return (
        <div className="w-full lg:grid lg:grid-cols-2 min-h-screen relative overflow-y-auto">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <Logo className="lg:text-9xl"/>
                        <h1 className="text-3xl font-bold">Connexion</h1>
                        <p className="text-balance text-muted-foreground">
                            Bienvenue sur Forme
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(handleLogin)} className="flex flex-col gap-3">
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
                                            <FormDescription>
                                                <a
                                                    href="/forgot-password"
                                                    className="ml-auto inline-block text-sm underline"
                                                >
                                                    Mot de passe oublié?
                                                </a>
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <Button
                                    type="submit"
                                    className="w-full mt-8">
                                    Connexion
                                </Button>
                            </form>
                        </Form>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Pas de compte?{" "}
                        <a href="/signup" className="underline">
                            Inscription
                        </a>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <img
                    src={LoginImg}
                    alt="Image"
                    className="h-full w-full object-center lg:h-screen dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            <div className="absolute left-5 bottom-2">
                <ModeToggle/>
            </div>
            <Toaster/>
        </div>
    )
}
