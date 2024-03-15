"use server";

import { prisma } from "@/lib/third-party/third-party";
import { Slot } from "@/lib/types/types";

export async function createSlot(slot: Slot) {
    const { coachId, ...rest } = slot;

    await prisma.slot.create({
        data: {
            coachId: Number(coachId),
            ...rest,
        },
    })
}

export async function fetchSlots(coachId: number) {
    return await prisma.slot.findMany({
        where: {
            coachId: coachId,
        }
    })
}
