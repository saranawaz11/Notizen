import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ['latin'],
    weight: ['400', '600']
})
const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-1">
            <Image src='/logo.png' alt="logo" height={60} width={60} className="dark:hidden" />
            <Image src='/logo-dark.png' alt="logo" height={60} width={60} className="hidden dark:block" />
            <p className={cn('font-semibold text-3xl text-[#655560]', font.className)}>Notizen</p>
        </div>
    );
}

export default Logo;