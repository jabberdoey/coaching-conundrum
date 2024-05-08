import { prisma } from "@/lib/third-party/third-party";
import Image from "next/image";
import Link from "next/link";

async function fetchCoaches() {
    try {
        const fetchData = async () => {
            return await prisma.coach.findMany();
        }
        return fetchData();
    } catch(error) {
        console.error(`Error fetching coaches: ${error}`);
        return [];
    }
}

export default async function Page() {
    const coaches = await fetchCoaches();

    return (
        <div className="flex flex-col gap-5 lg:gap-10 items-center">
            <h2 className="text-xl font-semibold text-slate-800">Select a coach:</h2>
            <ul className="grid grid-rows-2 grid-flow-col gap-4 lg:flex lg:flex-row gap-5">
                {coaches.map((coach) => (
                    <li
                        key={coach.id}
                        className="group"
                    >
                        <Link
                            className="drop-shadow-md bg-slate-100 border-2 border-slate-200 flex flex-col gap-5 items-center p-5 rounded-xl transition duration-200 ease-in-out group-hover:-translate-y-2 group-hover:bg-orange-500 h-full group-hover:border-orange-700"
                            href={`/slots/${coach.id}`}
                        >
                            <Image
                                className="p-2 bg-white rounded-full"
                                alt={`Coach ${coach.name}`}
                                src={`/avatars/${coach.name.toLowerCase().replace(" ", "-")}.jpg`}
                                width={150}
                                height={150}
                            />
                            <div
                                className="text-center text-md font-medium text-slate-500 transition duration-300 ease-in-out group-hover:text-white"
                            >
                                {coach.name}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
