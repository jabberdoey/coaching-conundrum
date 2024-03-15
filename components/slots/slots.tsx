"use client";

import { useState } from "react";
import { getDate, getDaySlots, getTimeInHourFormat } from "@/lib/utils/date";
import { Coach, Slot } from "@/lib/types/types";
import clsx from "clsx";

export default function Slots({
    coach,
    slots,
    createSlot,
}: {
    coach: Coach;
    slots: Slot[],
    createSlot: (slot: Slot) => void;
}) {
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    const daySlots = getDaySlots(new Date());

    function selectSlot(slot: Slot) {
        setSelectedSlot(slot);
    }

    function renderConfirmPrompt() {
        if (!selectedSlot) return;

        const { startTime, endTime } = selectedSlot;
        if (!startTime || !endTime) return;

        return (
            <div className="mx-auto w-1/4 fixed inset-x-0 top-10">
                <div className="border border-solid border-8 border-slate-600 bg-slate-100 fixed w-[400px] align-middle border p-8 bg-white z-10">
                    <div className="mb-5">
                        Schedule <span className="font-bold">{getTimeInHourFormat(startTime)} - {getTimeInHourFormat(endTime)}</span> for {coach.name}?
                    </div>
                    <div className="flex flex-row flex-row-reverse gap-2">
                        <button
                            onClick={() => { setSelectedSlot(null) }}
                            className="border border-solid border-black py-2 px-5 hover:bg-black hover:text-white"
                        >No</button>
                        <button
                            onClick={() => {
                                createSlot({ ...selectedSlot });
                                setSelectedSlot(null);
                            }}
                            className="border border-solid border-black py-2 px-5 hover:bg-black hover:text-white"
                        >Yes</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="my-5 text-2xl font-bold">Coach:</h2>
            {selectedSlot && renderConfirmPrompt()}
            <p className="mt-5">
                <span className="font-bold">Name:</span> {coach.name}
            </p>
            <p>
                <span className="font-bold">Phone:</span> {coach.phone}
            </p>
            <div className="mt-10">
                <p className="text-lg my-5">Select availability for <span className="font-bold">{getDate(new Date())}</span></p>
                <ul className="flex flex-col gap-5">
                    {daySlots.map((slot, index) => {
                        const isSlotTaken = slots.find((s) =>
                            getTimeInHourFormat(s.startTime) === getTimeInHourFormat(slot.startTime)
                            && getTimeInHourFormat(s.endTime) === getTimeInHourFormat(slot.endTime)
                        );

                        return (
                            <li key={index}>
                                <div
                                    className={clsx(
                                        "w-1/6 h-[100px] flex border border justify-center items-center p-5",
                                        !isSlotTaken && "cursor-pointer hover:bg-gray-200",
                                        isSlotTaken && "relative bg-gray-200",
                                    )}
                                    onClick={() => {
                                        if (isSlotTaken) return
                                        selectSlot({ coachId: Number(coach.id), ...slot });
                                    }}
                                >
                                    {isSlotTaken && (
                                        <div className="absolute z-10 w-full h-full flex border border justify-center items-center p-5 opacity-90 bg-lime-500">
                                            <p className="font-bold text-2xl">Booked</p>
                                        </div>
                                    )}
                                    {`${getTimeInHourFormat(slot.startTime)} - ${getTimeInHourFormat(slot.endTime)}`}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
