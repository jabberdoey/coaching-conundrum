import Link from "next/link";
import constants from "@/constants.json";

export default function Navigation() {
    const { links } = constants;

    return (
        <div className="mb-5">
            <ul className="flex flex-row gap-5 justify-center">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link href={link.url} className="underline hover:text-blue-600">
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
