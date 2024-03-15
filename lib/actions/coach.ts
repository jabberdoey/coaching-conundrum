"use server";

import { prisma } from "@/lib/third-party/third-party";

export async function fetchCoach(id: string) {
    return await prisma.coach.findUnique({
        where: {
            id: Number(id),
        }
    })
};
