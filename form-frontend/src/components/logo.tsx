import {cn} from "@/lib/utils.ts";
import {Link} from "react-router-dom";

interface LogoProps {
    className?: string;
}

const Logo = ({className}: LogoProps) => {
    return (
        <div className={cn("font-jim-logo text-6xl p-4", className)}>
            <Link to={"/"}>
                L
            </Link>
        </div>
    );
};

export default Logo;
