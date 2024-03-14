const data = require("./data.json");
const prisma = require("../lib/third-party/third-party");

async function seed() {
    const { coaches, students } = data;
    try {
        await prisma.$transaction(async (prisma) => {
            await Promise.all([
                ...coaches.map((coach) => prisma.coach.create({ data: coach })),
                ...students.map((student) => prisma.student.create({ data: student })),
            ])
        })
        console.log("Seed data inserted successfully.")
    } catch(error) {
        console.error(`Error seeding data: ${error}`)
    }
}

seed();
