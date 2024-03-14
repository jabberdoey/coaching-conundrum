import { PrismaClient } from "@prisma/client";

export default function Slots({
    params,
    searchParams,
}: {
    params: { id: number; };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const prisma = new PrismaClient();

    async function createUser() {
        await prisma.slot.create({
            data: {
                coachId: Number(params.id),
                startTime: new Date('2022-03-20T09:00:00Z'),
                endTime: new Date('2022-03-20T10:00:00Z'),
            },
        })
    
        const slots = await prisma.slot.findMany()

        console.log(slots)
    }

    createUser();

    return (
        <div>List of slots for coach id: {params.id}</div>
    );
}
