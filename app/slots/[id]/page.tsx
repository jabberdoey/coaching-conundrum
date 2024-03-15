"use server";

import { fetchCoach } from "@/lib/actions/coach";
import Slots from "@/components/slots/slots";
import { Slot } from "@/lib/types/types";
import { createSlot, fetchSlotsByCoachId } from "@/lib/actions/slots";
import { fetchBookingsWithSlotAndStudent } from "@/lib/actions/booking";
import { redirect } from "next/navigation";
import Error from "@/components/error/error";

export default async function Page({
    params,
}: {
    params: { id: string; };
}) {
    const coach = await fetchCoach(params.id);
    if (!coach) {
        return (
            <Error message="Coach not found!" />
        );
    }

    const slots = await fetchSlotsByCoachId(Number(coach.id));
    const bookings = await fetchBookingsWithSlotAndStudent() || [];

    async function handleCreateSlot(slot: Slot) {
        "use server";
        
        createSlot(slot);
        redirect(`/slots/${slot.coachId}`);
    }

    return (
        <Slots
            coach={coach}
            slots={slots}
            bookings={bookings}
            createSlot={handleCreateSlot}
        />
    );
}
