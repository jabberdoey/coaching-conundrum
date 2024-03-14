import { PrismaClient } from "@prisma/client";
import { Coach, Student } from "@/lib/types/types";
import Link from "next/link";

const prisma = new PrismaClient();

async function fetchData() {
    try {
        const coaches = await prisma.coach.findMany();
        const students = await prisma.student.findMany();
        return { coaches, students };
    } catch(error) {
        console.error(`Error fetching data: ${error}`)
        return { coaches: [], students: [] };
    }
}

export default async function Login() {
    const { coaches, students } = await fetchData();

    function renderItems(items: Coach[] | Student[]) {
        return (
            <ul className="flex flex-row gap-5">
                {items.map((item) => (
                    <li key={item.id} className="w-[200px] h-[200px] hover:bg-gray-200">
                        <Link href={`/slots/${item.id}`} className="w-full h-full flex border cursor-pointer border justify-center items-center ">
                            <div>{item.name}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div>
            <h2 className="my-5 text-2xl font-bold">Coaches:</h2>
            {renderItems(coaches)}
            <h2 className="my-5 text-2xl font-bold">Students:</h2>
            {renderItems(students)}
        </div>
    );
}
