export function getDate(date: Date) {
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

export function getDaySlots(today: Date) {
    const slots = [];

    for (let i = 0; i < 24; i += 2) {
        const startTime = new Date(today);
        startTime.setHours(i, 0, 0, 0);

        const endTime = new Date(today);
        endTime.setHours(i + 2, 0, 0, 0);

        slots.push({ startTime, endTime });
    }

    return slots;
}
