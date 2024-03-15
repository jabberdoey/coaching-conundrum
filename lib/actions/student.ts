import { prisma } from "@/lib/third-party/third-party";

export async function fetchStudent(id: string) {
    return await prisma.student.findUnique({
        where: {
            id: Number(id),
        },
    });
}
