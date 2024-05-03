import Link from "next/link";
import constants from "@/constants.json";
import Home from "@/components/icons/home";

export default function Navigation() {
    const { links } = constants;

    return (
        <div className="mb-10">
            <ul className="flex flex-row justify-center">
                {links.map((link, index) => (
                    <li
                        className="group"
                        key={index}
                    >
                        <Link href={link.url} className="p-1 px-2 bg-slate-200 text-slate-800 rounded-lg flex flex-row text-sm uppercase font-semibold transition duration-300 ease-in-out group-hover:bg-slate-600">
                            <span className="flex flex-row gap-2 items-center justify-center p-1 rounded-lg transition duration-300 ease-in-out group-hover:text-slate-300">
                                <Home />
                                <span>Home</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
