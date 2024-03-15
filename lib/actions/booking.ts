import { prisma } from "@/lib/third-party/third-party";

export async function fetchBookingWithSlot() {
    return await prisma.booking.findMany({
        include: {
            slot: true,
        },
    });
}

export async function createBooking({
    slotId,
    studentId,
}: {
    slotId: number;
    studentId: number;
}) {
    return await prisma.booking.create({
        data: {
            slotId: Number(slotId),
            studentId: studentId,
        },
    });
}
