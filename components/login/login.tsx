import Link from "next/link";
import constants from "@/constants.json";

export default async function Login() {
    const { logins } = constants;

    return (
        <div>
            <h2 className="my-5 text-2xl font-bold">Select a login:</h2>
            <ul className="flex flex-row gap-5">
                {logins.map((login, index) => (
                    <li key={index} className="w-[200px] h-[200px] hover:bg-gray-200">
                        <Link href={login.url} className="w-full h-full flex border cursor-pointer border justify-center items-center ">
                            <div>{login.name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
