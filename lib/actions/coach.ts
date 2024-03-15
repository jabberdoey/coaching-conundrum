"use server";

import { prisma } from "@/lib/third-party/third-party";
import { Coach } from "@/lib/types/types";

export async function fetchCoach(id: string): Promise<Coach | null> {
    return await prisma.coach.findUnique({
        where: {
            id: Number(id),
        }
    })
};
