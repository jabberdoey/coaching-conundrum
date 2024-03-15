"use client";

import { useState } from "react";
import { getDate, getTimeInHourFormat } from "@/lib/utils/date";
import { BookingsWithSlotAndStudent, Student, SlotWithCoach } from "@/lib/types/types";
import clsx from "clsx";

export default function Booking({
    student,
    slots,
    bookings,
    createBooking,
}: {
    student: Student;
    slots: SlotWithCoach[],
    bookings: BookingsWithSlotAndStudent[],
    createBooking: (slot: SlotWithCoach) => void;
}) {
    const [selectedSlot, setSelectedSlot] = useState<SlotWithCoach | null>(null);

    function selectSlot(slot: SlotWithCoach) {
        setSelectedSlot(slot);
    }

    function renderConfirmPrompt() {
        if (!selectedSlot) return;

        const { coach, startTime, endTime } = selectedSlot;
        if (!startTime || !endTime) return;

        return (
            <div className="z-50 mx-auto w-1/4 fixed inset-x-0 top-10">
                <div className="border border-solid border-8 border-slate-600 bg-slate-100 fixed w-[400px] align-middle border p-8 bg-white z-10">
                    <div className="mb-5">
                        Confirm booking on <span className="font-bold">{getDate(new Date())}</span> at <span className="font-bold">{getTimeInHourFormat(startTime)} - {getTimeInHourFormat(endTime)}</span> with <span className="font-bold">{coach.name}</span>?
                    </div>
                    <div className="flex flex-row flex-row-reverse gap-2">
                        <button
                            onClick={() => { setSelectedSlot(null) }}
                            className="border border-solid border-black py-2 px-5 hover:bg-black hover:text-white"
                        >No</button>
                        <button
                            onClick={() => {
                                createBooking({ ...selectedSlot });
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
            {selectedSlot && renderConfirmPrompt()}
            <h2 className="my-5 text-2xl font-bold">{student.name} ({student.phone})</h2>
            {slots.length ? (
                <div>
                    <p className="text-lg my-5">Book an available time slot with a coach:</p>
                    <ul className="gap-5 flex flex-col">
                        {slots.map((slot, index) => {
                            const reservedSlot = bookings.find((b) =>
                                getTimeInHourFormat(b.slot.startTime) === getTimeInHourFormat(slot.startTime)
                                && getTimeInHourFormat(b.slot.endTime) === getTimeInHourFormat(slot.endTime)
                            );

                            return (
                                <li key={index}>
                                    <div
                                        className={clsx(
                                            "w-full h-[100px] flex flex-col border justify-center items-center p-5",
                                            !reservedSlot && "cursor-pointer hover:bg-gray-200",
                                            reservedSlot && "relative bg-gray-200",
                                        )}
                                        onClick={() => {
                                            selectSlot({
                                                ...slot,
                                                coachId: Number(slot.coach.id),
                                            });
                                        }}
                                    >
                                        {reservedSlot && (
                                            <div className="absolute z-10 w-full h-full text-center flex border border-lime-900 justify-center items-center p-5 bg-rose-300">
                                                <p className="font-bold text-2xl">Reserved by {reservedSlot.student.name}</p>
                                            </div>
                                        )}
                                        <div className="font-bold text-center items-center">{slot.coach.name}</div>
                                        <div className="text-center items-center">{`${getTimeInHourFormat(slot.startTime)} - ${getTimeInHourFormat(slot.endTime)}`}</div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <h2>No time slot available at this time. Please try again later.</h2>
            )}
        </div>
    );
}
