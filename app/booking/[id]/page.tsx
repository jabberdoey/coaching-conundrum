"use server";

import { redirect } from "next/navigation";
import { fetchStudent } from "@/lib/actions/student";
import { createBooking, fetchBookingsWithSlotAndStudent } from "@/lib/actions/booking";
import { fetchSlotsWithCoach } from "@/lib/actions/slots";
import { SlotWithCoach } from "@/lib/types/types";
import Booking from "@/components/booking/booking";
import Error from "@/components/error/error";

export default async function Page({
    params,
}: {
    params: { id: string; }
}) {
    const student = await fetchStudent(params.id);
    if (!student) {
        return (
            <Error message="Student not found!" />
        );
    }

    const slots = await fetchSlotsWithCoach();
    const bookings = await fetchBookingsWithSlotAndStudent();

    async function handleCreateBooking(slot: SlotWithCoach) {
        "use server";

        if (!student) return;

        createBooking({
            slotId: slot.id,
            studentId: student.id,
        });
        redirect(`/booking/${student.id}`);
    }

    return (
        <Booking
            student={student}
            slots={slots}
            bookings={bookings}
            createBooking={handleCreateBooking}
        />
    );
}
