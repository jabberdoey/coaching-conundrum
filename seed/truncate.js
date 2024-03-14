const prisma = require("../lib/third-party/third-party");

async function truncate() {
    const tables = [
        "Coach",
        "Student",
        "Booking",
        "Slot",
        "Feedback",
    ];
    try {
        for (const table of tables) {
            await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`)
            console.log(`Table ${table} truncated successfully.`)
        }
    } catch(error) {
        console.error(`Error performing TRUNCATE operation: ${error}`)
    }
}

truncate();
