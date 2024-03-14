import { prisma } from "@/lib/third-party/third-party";
import Link from "next/link";

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
        <div>
            <h2 className="my-5 text-2xl font-bold">Students:</h2>
            <ul className="flex flex-row gap-5">
                {students.map((student) => (
                    <li key={student.id} className="w-[200px] h-[200px] hover:bg-gray-200">
                        <Link href={`/booking/${student.id}`} className="w-full h-full flex border cursor-pointer border justify-center items-center">
                            <div>{student.name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
