export type Coach = {
    id: number;
    name: string;
    phone: string;
}

export type Student = {
    id: number;
    name: string;
    phone: string;
}

export type Slot = {
    id: number;
    coachId: number;
    startTime: Date;
    endTime: Date;
}

export type Booking = {
    id: number;
    slotId: number;
    studentId: number;
}

export type SlotWithCoach = (Slot & { coach: Coach; });

export type BookingWithSlot = (Booking & { slot: Slot; });
