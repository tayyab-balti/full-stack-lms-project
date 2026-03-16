const Subject = require("../models/Subject");
const Video = require("../models/Video");

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Failed to fetch subjects." });
  }
};

const createSubject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // multer puts the saved file info on req.file
    const imageFile = req.file ? `public/uploads//${req.file.filename}` : null;

    const subject = await Subject.create({ title, imageFile, description });
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: "Failed to create subject", error });
  }
};

const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // only update url if a new file was uploaded
    const imageFile = req.file ? `public/uploads//${req.file.filename}` : subject.imageFile;

    subject.update({ title, imageFile, description });
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: "Failed to update subject", error });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    await subject.destroy();
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete subject", error });
  }
};

module.exports = {
  getAllSubjects,
  createSubject,
  deleteSubject,
  updateSubject,
};
