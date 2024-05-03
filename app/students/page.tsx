import { prisma } from "@/lib/third-party/third-party";
import Link from "next/link";
import Image from "next/image";

async function fetchStudents() {
    try {
        const fetchData = async () => {
            return await prisma.student.findMany();
        }
        return fetchData();
    } catch (error) {
        console.error(`Error fetching students: ${error}`);
        return [];
    }
}

export default async function Page() {
    const students = await fetchStudents();

    return (
        <div className="flex flex-col gap-5 items-center">
            <h2 className="text-xl font-semibold text-slate-800">Select a student:</h2>
            <ul className="flex flex-row gap-5">
                {students.map((student) => (
                    <li
                        key={student.id}
                        className="group"
                    >
                        <Link
                            className="drop-shadow-md bg-white border border-slate-200 flex flex-col gap-5 items-center p-5 rounded-xl transition duration-200 ease-in-out group-hover:-translate-y-2 group-hover:bg-orange-500 h-full"
                            href={`/booking/${student.id}`}
                        >
                            <Image
                                className="p-2 bg-white rounded-full transition duration-300 ease-in-out group-hover:drop-shadow-md"
                                alt={`Coach ${student.name}`}
                                src={`/avatars/${student.name.toLowerCase().replace(" ", "-")}.jpg`}
                                width={150}
                                height={150}
                            />
                            <div className="text-center text-xs uppercase font-bold text-slate-900 transition duration-300 ease-in-out group-hover:text-white">{student.name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
