"use server";

import { prisma } from "@/lib/third-party/third-party";

export async function createSlot(id: string) {
    await prisma.slot.create({
        data: {
            coachId: Number(id),
            startTime: new Date('2022-03-20T09:00:00Z'),
            endTime: new Date('2022-03-20T10:00:00Z'),
        },
    })

    const slots = await prisma.slot.findMany();
}
