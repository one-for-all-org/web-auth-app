import { IconButton } from "../commons";
import { FaArrowRightLong } from "react-icons/fa6";
import { ColorModeButton } from "../ui/color-mode";

export const Navbar = () => {
    return (
        <>
            <nav className="w-full h-16 py-4 border-b-3 border-black/10 flex items-center justify-between bg-amber-200">
                <div className="font-bold text-lg">Auth App</div>
                <div className="flex items-center gap-4">
                    <ColorModeButton />
                    <IconButton
                        icon={FaArrowRightLong}
                        size="sm"
                        value="Get started"
                        variant="subtle"
                        colorPalette="grey"
                    />
                </div>
            </nav>
        </>
    );
};
