"use client";

import { useState } from "react";
import { getDate, getDaySlots, getTimeInHourFormat } from "@/lib/utils/date";
import { BookingsWithSlotAndStudent, Coach, Slot } from "@/lib/types/types";
import clsx from "clsx";

export default function Slots({
    coach,
    slots,
    bookings,
    createSlot,
}: {
    coach: Coach;
    slots: Slot[],
    bookings: BookingsWithSlotAndStudent[],
    createSlot: (slot: Slot) => void;
}) {
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<BookingsWithSlotAndStudent | null>(null);

    const daySlots = getDaySlots(new Date());
    const filteredBookings = bookings.filter((booking) => slots.find((slot) => booking.slot.coachId === slot.coachId));

    function selectSlot(slot: Slot) {
        setSelectedSlot(slot);
    }

    function renderConfirmPrompt() {
        if (!selectedSlot) return;

        const { startTime, endTime } = selectedSlot;
        if (!startTime || !endTime) return;

        return (
            <div className="z-50 mx-auto w-1/4 fixed inset-x-0 top-10">
                <div className="border border-solid border-8 border-slate-600 bg-slate-100 fixed w-[400px] align-middle border p-8 bg-white z-10">
                    <div className="mb-5">
                        Make yourself available to students on <span className="font-bold">{getDate(new Date())}</span> at <span className="font-bold">{getTimeInHourFormat(startTime)} - {getTimeInHourFormat(endTime)}</span>?
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

    function renderBookings(filteredBookings: BookingsWithSlotAndStudent[]) {
        return (
            <div>
                <h2 className="text-lg">Your upcoming bookings:</h2>
                <div className="mt-5 mb-12">
                    <ul className="gap-5 flex flex-col">
                        {filteredBookings.map((booking) => (
                            <li
                                key={booking.id}
                                className="w-full h-[100px] border gap-2 cursor-pointer hover:bg-gray-200 flex flex-row justify-center items-center p-5"
                                onClick={() => { setSelectedBooking(booking) }}
                            >
                                <p>{`${getTimeInHourFormat(booking.slot.startTime)} - ${getTimeInHourFormat(booking.slot.endTime)}`}</p>
                                <p>with</p>
                                <p className="font-bold">{booking.student.name} ({booking.student.phone})</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    function renderBookingDetailsPrompt() {
        if (!selectedBooking) {
            return;
        }

        return (
            <div className="z-50 mx-auto w-1/4 fixed inset-x-0 top-10">
                <div className="border border-solid border-8 border-slate-600 bg-slate-100 fixed w-[400px] align-middle border p-8 bg-white z-10">
                    <div className="mb-5">
                        Call <span className="font-bold">{selectedBooking.student.name}</span> at <span className="font-bold">{selectedBooking.student.phone}</span>?
                    </div>
                    <div className="flex flex-row flex-row-reverse gap-2">
                        <button
                            onClick={() => { 
                                setSelectedBooking(null);
                            }}
                            className="border border-solid border-black py-2 px-5 hover:bg-black hover:text-white"
                        >No</button>
                        <button
                            onClick={() => { 
                                setSelectedBooking(null);
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
            {selectedBooking && renderBookingDetailsPrompt()}
            <h2 className="my-5 text-2xl font-bold">{coach.name} ({coach.phone})</h2>
            {filteredBookings.length ? renderBookings(filteredBookings) : null}
            <div>
                <p className="text-lg my-5">Make yourself available to students on <span className="font-bold">{getDate(new Date())}</span> at:</p>
                <ul className="gap-5 flex flex-col">
                    {daySlots.map((slot, index) => {
                        const reservedSlot = slots.find((s) =>
                            getTimeInHourFormat(s.startTime) === getTimeInHourFormat(slot.startTime)
                            && getTimeInHourFormat(s.endTime) === getTimeInHourFormat(slot.endTime)
                        );

                        return (
                            <li key={index}>
                                <div
                                    className={clsx(
                                        "w-full h-[100px] flex border justify-center items-center p-5",
                                        !reservedSlot && "cursor-pointer hover:bg-gray-200",
                                        reservedSlot && "relative bg-gray-200",
                                    )}
                                    onClick={() => {
                                        if (reservedSlot) return;
                                        selectSlot({
                                            ...slot,
                                            id: 0,
                                            coachId: Number(coach.id),
                                        });
                                    }}
                                >
                                    {reservedSlot && (
                                        <div className="absolute z-10 w-full h-full text-center flex border border-lime-900 justify-center items-center p-5 bg-rose-300">
                                            <p className="font-bold text-2xl">Not available</p>
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
