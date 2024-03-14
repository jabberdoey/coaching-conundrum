"use client";

import { getDate, getDaySlots } from "@/lib/utils/date";
import { Coach, Slot } from "@/lib/types/types";

export default function Slots({
    coach,
    createSlot,
}: {
    coach: Coach;
    createSlot: (slot: Slot) => void;
}) {
    const daySlots = getDaySlots(new Date());

    return (
        <div>
            <p className="mt-5">
                <span className="font-bold">Name:</span> {coach.name}
            </p>
            <p>
                <span className="font-bold">Phone:</span> {coach.phone}
            </p>
            <div className="mt-10">
                <p className="text-lg my-5">Availability for <span className="font-bold">{getDate(new Date())}:</span></p>
                <ul className="flex flex-col gap-5">
                    {daySlots.map((slot, index) => (
                        <li
                            key={index}
                            onClick={() => { createSlot({ coachId: Number(coach.id), ...slot }) }}
                            className="w-1/6 h-[100px] hover:bg-gray-200 flex border cursor-pointer border justify-center items-center"
                        >
                            <div>
                                {`${(slot.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} - 
                                ${(slot.endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
