"use client";

import { useState } from "react";
import { getDate, getDaySlots, getTimeInHourFormat } from "@/lib/utils/date";
import { BookingsWithSlotAndStudent, Coach, Slot } from "@/lib/types/types";
import Image from "next/image";
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
            <div className="w-full h-full fixed z-50">
                <div className="z-40 w-full fixed flex flex-col h-screen items-center justify-center">
                    <div className="bg-white drop-shadow-md fixed rounded-lg w-1/3 align-middle p-8 bg-white z-10">
                        <div className="mb-5 text-slate-600">
                            Make yourself available to students on <span className="font-bold text-slate-800">{getDate(new Date())}</span> at <span className="font-bold text-slate-800">{getTimeInHourFormat(startTime)} - {getTimeInHourFormat(endTime)}</span>?
                        </div>
                        <div className="flex flex-col-reverse lg:flex-row-reverse gap-2">
                            <button
                                onClick={() => { setSelectedSlot(null) }}
                                className="rounded-md bg-slate-400 border border-slate-400 text-slate-100 py-1 px-5"
                            >No</button>
                            <button
                                onClick={() => {
                                    createSlot({ ...selectedSlot });
                                    setSelectedSlot(null);
                                }}
                                className="rounded-md bg-orange-500 border border-orange-500 text-white py-1 px-5"
                            >Yes</button>
                        </div>
                    </div>
                </div>
                <div className="z-30 fixed w-full h-full bg-slate-900 opacity-75"></div>
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
        <div className="flex flex-col items-center justify-center border">
            {selectedSlot && renderConfirmPrompt()}
            {selectedBooking && renderBookingDetailsPrompt()}
            {filteredBookings.length ? renderBookings(filteredBookings) : null}

            <div className="lg:w-[500px] drop-shadow-md bg-slate-100 border-2 border-slate-200 flex flex-col gap-4 items-center p-5 rounded-xl">
                <Image
                    className="-my-16 mb-0 p-2 drop-shadow-md bg-white rounded-full"
                    alt={`Coach ${coach.name}`}
                    src={`/avatars/${coach.name.toLowerCase().replace(" ", "-")}.jpg`}
                    width={125}
                    height={125}
                />
                <h1 className="text-2xl font-semibold text-slate-800">{coach.name}</h1>
                <div className="flex flex-col w-full px-10 pt-5 pb-10 items-center bg-white rounded-lg border border-slate-200">
                    <p className="text-md text-slate-600 my-5">
                        <span className="font-bold text-slate-800">{getDate(new Date())}</span> availability:
                    </p>
                    <div className="flex w-full h-[135px] overflow-y-scroll py-[2px]">
                        <ul className="flex flex-col w-full">
                            {daySlots.map((slot, index) => {
                                const reservedSlot = slots.find((s) =>
                                    getTimeInHourFormat(s.startTime) === getTimeInHourFormat(slot.startTime)
                                    && getTimeInHourFormat(s.endTime) === getTimeInHourFormat(slot.endTime)
                                );

                                return (
                                    <li
                                        key={index}
                                        className={clsx(
                                            "relative flex flex-row w-full border border-slate-200 rounded-sm justify-center items-center p-2 text-sm",
                                            !reservedSlot && "cursor-pointer hover:bg-orange-500 hover:border-orange-700 hover:text-white",
                                            reservedSlot && "relative bg-gray-200",
                                            index % 2 !== 0 && "bg-white",
                                            index % 2 === 0 && "bg-slate-100",
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
                                            <div className="absolute z-10 w-full h-full text-center rounded-sm flex border border-lime-900 justify-center items-center p-5 bg-rose-300">
                                                <p className="font-bold text-md">No longer available</p>
                                            </div>
                                        )}
                                        {`${getTimeInHourFormat(slot.startTime)} - ${getTimeInHourFormat(slot.endTime)}`}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
