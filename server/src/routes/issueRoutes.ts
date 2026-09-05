import express from "express";
import mongoose from "mongoose";
import Issue from "../models/Issue.js";

const router = express.Router();

const VALID_STATUSES = [
  "Todo",
  "In Progress",
  "Done",
];

const VALID_PRIORITIES = [
  "Low",
  "Medium",
  "High",
];

// GET ALL ISSUES
router.get("/", async (req, res) => {
  try {
    const { search, status, priority, assignee } = req.query;

    const filter: Record<string, unknown> = {};

    if (search) {
      filter.title = {
        $regex: String(search),
        $options: "i",
      };
    }

    if (status && status !== "All Status") {
      if (!VALID_STATUSES.includes(String(status))) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }

      filter.status = String(status);
    }

    if (priority && priority !== "All Priority") {
      if (!VALID_PRIORITIES.includes(String(priority))) {
        return res.status(400).json({
          message: "Invalid priority",
        });
      }

      filter.priority = String(priority);
    }

    if (assignee && assignee !== "All Assignees") {
      filter.assignee = String(assignee);
    }

    const issues = await Issue.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json(issues);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch issues",
    });
  }
});

// GET ONE ISSUE
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid issue ID",
      });
    }

    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    return res.status(200).json(issue);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch issue",
    });
  }
});

// CREATE ISSUE
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      status = "Todo",
      priority = "Medium",
      assignee = "",
    } = req.body;

    if (
      typeof title !== "string" ||
      title.trim() === ""
    ) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      return res.status(400).json({
        message: "Description is required",
      });
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    if (!VALID_PRIORITIES.includes(priority)) {
      return res.status(400).json({
        message: "Invalid priority",
      });
    }

    const issue = await Issue.create({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      assignee:
        typeof assignee === "string"
          ? assignee.trim()
          : "",
    });

    return res.status(201).json(issue);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create issue",
    });
  }
});

// UPDATE ISSUE
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid issue ID",
      });
    }

    const {
      title,
      description,
      status,
      priority,
      assignee,
    } = req.body;

    if (
      title !== undefined &&
      (
        typeof title !== "string" ||
        title.trim() === ""
      )
    ) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (
      description !== undefined &&
      (
        typeof description !== "string" ||
        description.trim() === ""
      )
    ) {
      return res.status(400).json({
        message: "Description is required",
      });
    }

    if (
      status !== undefined &&
      !VALID_STATUSES.includes(status)
    ) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    if (
      priority !== undefined &&
      !VALID_PRIORITIES.includes(priority)
    ) {
      return res.status(400).json({
        message: "Invalid priority",
      });
    }

    const updateData: Record<string, unknown> = {};

    if (title !== undefined) {
      updateData.title = title.trim();
    }

    if (description !== undefined) {
      updateData.description = description.trim();
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    if (priority !== undefined) {
      updateData.priority = priority;
    }

    if (assignee !== undefined) {
      updateData.assignee =
        typeof assignee === "string"
          ? assignee.trim()
          : "";
    }

    const issue = await Issue.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    return res.status(200).json(issue);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update issue",
    });
  }
});

// DELETE ISSUE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid issue ID",
      });
    }

    const issue = await Issue.findByIdAndDelete(id);

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    return res.status(200).json({
      message: "Issue deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete issue",
    });
  }
});

export default router;