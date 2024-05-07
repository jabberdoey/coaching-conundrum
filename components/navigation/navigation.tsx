"use client";

import Link from "next/link";
import constants from "@/constants.json";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navigation() {
    const { links } = constants;
    const pathname = usePathname();
    const [path, id] = pathname.split("/").filter(Boolean);

    return (
        <div className="flex items-center justify-center">
            <div className="fixed mt-20">
                <ul className="flex flex-row justify-center gap-3">
                    {links.map((link, index) => (
                        <li
                            className="group"
                            key={index}
                        >
                            <Link
                                href={link.url}
                                className={clsx(
                                    "p-2 text-slate-800 rounded-lg flex flex-row text-xs uppercase font-semibold transition duration-300 ease-in-out",
                                    pathname === link.url
                                        ? "bg-orange-500 text-white group-hover:text-white"
                                        : "group-hover:text-orange-700",
                                )}
                            >
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
