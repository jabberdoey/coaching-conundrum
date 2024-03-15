"use server";

import { prisma } from "@/lib/third-party/third-party";
import { Slot } from "@/lib/types/types";

export async function createSlot(slot: Slot) {
    const { coachId, startTime, endTime } = slot;

    await prisma.slot.create({
        data: {
            coachId: Number(coachId),
            startTime,
            endTime,
        },
    });
}

export async function fetchSlotsByCoachId(coachId: number) {
    return await prisma.slot.findMany({
        where: {
            coachId: coachId,
        }
    });
}

export async function fetchSlotsWithCoach() {
    return prisma.slot.findMany({
        include: {
            coach: true,
        },
    });
}
