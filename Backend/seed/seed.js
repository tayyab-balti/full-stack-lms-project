require("dotenv").config();
require("../src/config/db.js"); // establishes the sequelize connection
const Subject = require("../src/models/Subject.js");
const Video = require("../src/models/Video.js");

const BASE_S = "public/uploads/";
const subjects = [
  {
    id: 1,
    title: "Computer Science",
    imageFile: `${BASE_S}/computer_science.jpg`,
    description: "Build algorithms, master data structures & software design.",
  },
  {
    id: 2,
    imageFile: "Mathematics",
    url: `${BASE_S}/mathematics.jpg`,
    description: "Explore calculus, algebra, statistics & pure reasoning.",
  },
  {
    id: 3,
    title: "English",
    imageFile: `${BASE_S}/english.jpg`,
    description:
      "Develop critical reading, writing & literary analysis skills.",
  },
  {
    id: 4,
    title: "Physics",
    imageFile: `${BASE_S}/physics.jpg`,
    description: "Uncover the laws governing matter, energy & the universe.",
  },
  {
    id: 5,
    title: "History",
    imageFile: `${BASE_S}/history.jpg`,
    description: "Understand civilizations & forces that shaped humanity.",
  },
  {
    id: 6,
    title: "Economics",
    imageFile: `${BASE_S}/economics.jpg`,
    description: "Analyze markets, trade, policy & the flow of global wealth.",
  },
];

const BASE_V =
  "https://yhbjutrhjgtcleouolal.supabase.co/storage/v1/object/public/Videos";

const videos = [
  { subjectId: 1, title: "Lecture 1", url: `${BASE_V}/cs-lecture-1.mp4` },
  { subjectId: 1, title: "Lecture 2", url: `${BASE_V}/cs-lecture-2.mp4` },
  { subjectId: 2, title: "Lecture 1", url: `${BASE_V}/maths-lec-1.mp4` },
  { subjectId: 2, title: "Lecture 2", url: `${BASE_V}/maths-lec-2.mp4` },
  { subjectId: 3, title: "Lecture 1", url: `${BASE_V}/english-lec-1.mp4` },
  { subjectId: 3, title: "Lecture 2", url: `${BASE_V}/english-lec-2.mp4` },
  { subjectId: 4, title: "Lecture 1", url: `${BASE_V}/physics-lec-1.mp4` },
  { subjectId: 4, title: "Lecture 2", url: `${BASE_V}/physics-lec-2.mp4` },
  { subjectId: 5, title: "Lecture 1", url: `${BASE_V}/history-lec-1.mp4` },
  { subjectId: 5, title: "Lecture 2", url: `${BASE_V}/history-lec-2.mp4` },
  { subjectId: 6, title: "Lecture 1", url: `${BASE_V}/economics-lec-1.mp4` },
  { subjectId: 6, title: "Lecture 2", url: `${BASE_V}/economics-lec-2.mp4` },
];

async function seed() {
  try {
    // First, sync the Subjects table and insert data
    // await Subject.sync({ alter: true });
    // await Subject.bulkCreate(subjects); // Seed the subjects first
    console.log("Subjects seeded successfully.");

    // Then, sync the Videos table and insert data
    await Video.sync({ alter: true });
    await Video.bulkCreate(videos); // Seed the videos after the subjects are inserted

    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
