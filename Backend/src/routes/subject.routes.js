const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../config/multer");
const {
  getAllSubjects,
  createSubject,
  deleteSubject,
  updateSubject,
} = require("../controllers/subject.controller");

// Protected — user must be logged in to access subjects and videos
router.get("/", authMiddleware, getAllSubjects);
router.post("/", authMiddleware, upload.single("image"), createSubject);
router.put("/:id", authMiddleware, upload.single("image"), updateSubject);
router.delete("/:id", authMiddleware, deleteSubject);

module.exports = router;
