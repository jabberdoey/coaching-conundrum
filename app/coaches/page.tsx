import { prisma } from "@/lib/third-party/third-party";
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
        <div>
            <h2 className="my-5 text-2xl font-bold">Coaches:</h2>
            <ul className="flex flex-row gap-5">
                {coaches.map((coach) => (
                    <li key={coach.id} className="w-[200px] h-[200px] hover:bg-gray-200">
                        <Link href={`/slots/${coach.id}`} className="w-full h-full flex border cursor-pointer border justify-center items-center ">
                            <div>{coach.name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
