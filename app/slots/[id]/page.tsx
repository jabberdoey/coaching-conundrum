"use server";

import { fetchCoach } from "@/lib/actions/coach";
import Slots from "@/components/slots/slots";
import { Slot } from "@/lib/types/types";

export default async function Page({
    params,
    searchParams,
}: {
    params: { id: string; };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const coach = await fetchCoach(params.id);
    if (!coach) return;

    async function handleCreateSlot(slot: Slot) {
        "use server";
        
        console.log("server: ")
        console.log(slot)
    }

    return (
        <Slots coach={coach} createSlot={handleCreateSlot} />
    );
}
