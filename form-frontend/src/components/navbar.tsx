import Logo from "@/components/logo.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {useNavigate} from "react-router-dom";

interface NavbarProps {
    className?: string;
}

const Navbar = ({className}: NavbarProps) => {
    const navigate = useNavigate();

    //TODO: add state isConnected ?

    return (
        <nav className={cn("flex w-full items-center justify-between px-4", className)}>
            <Logo />
            <Button
                variant="outline"
                onClick={() => navigate("/login")}
            >
                Connexion
            </Button>
        </nav>
    );
};

export default Navbar;
