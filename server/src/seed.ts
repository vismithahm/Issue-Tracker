import mongoose from "mongoose";
import "dotenv/config";

import Issue from "./models/Issue.js";

const issues = [
  {
    title: "Login page not loading",
    description: "The login page remains blank after submitting the form.",
    status: "Todo",
    priority: "High",
    assignee: "Rahul",
  },
  {
    title: "Fix dashboard layout",
    description: "Dashboard cards are not aligned correctly on smaller screens.",
    status: "In Progress",
    priority: "Medium",
    assignee: "Ananya",
  },
  {
    title: "Update user profile",
    description: "Allow users to update their profile information.",
    status: "Todo",
    priority: "Low",
    assignee: "Vikram",
  },
  {
    title: "API response error",
    description: "The issues API sometimes returns an unexpected response.",
    status: "In Progress",
    priority: "High",
    assignee: "Priya",
  },
  {
    title: "Improve search functionality",
    description: "Search should filter issues by title.",
    status: "Done",
    priority: "Medium",
    assignee: "Arjun",
  },
  {
    title: "Add mobile responsiveness",
    description: "Improve the dashboard experience on mobile devices.",
    status: "Todo",
    priority: "Medium",
    assignee: "Sneha",
  },
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is missing from .env");
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected");

    await Issue.deleteMany({});

    await Issue.insertMany(issues);

    console.log("6 issues inserted successfully");

    await mongoose.disconnect();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();