import Link from "next/link";
import constants from "@/constants.json";
import Image from "next/image";

export default async function Login() {
    const { logins } = constants;

    return (
        <div className="mt-5 flex flex-col gap-5 items-center">
            <h2 className="text-base font-medium">Log in as:</h2>
            <ul className="flex flex-row">
                {logins.map((login, index) => (
                    <li
                        className="group"
                        key={index}
                    >
                        <Link
                            className="flex flex-col gap-5 items-center p-5 rounded-xl transition duration-300 ease-in-out group-hover:bg-slate-200"
                            href={login.url}
                        >
                            <Image
                                className="p-1 bg-white border border-slate-200 drop-shadow-md rounded-full transition duration-300 group-hover:-translate-y-2"
                                alt={login.name}
                                src={login.imageUrl}
                                width={150}
                                height={150}
                            />
                            <div className="text-sm font-medium text-slate-800">{login.name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
