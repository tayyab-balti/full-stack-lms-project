const Video = require("../models/Video");

// GET /api/videos?subjectId=1 — returns videos filtered by subjectId
const getVideos = async (req, res) => {
  try {
    const { subjectId } = req.query;

    if (!subjectId) {
      return res.status(400).json({ message: "subjectId is required" });
    }

    const where = subjectId ? { subjectId: Number(subjectId) } : {};
    const videos = await Video.findAll({ where: { subjectId } });
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Failed to fetch videos." });
  }
};

const createVideo = async (req, res) => {
  try {
    const { title, url, subjectId } = req.body;

    if (!title || !url || !subjectId) {
      return res
        .status(400)
        .json({ message: "title, url and subjectId are required" });
    }

    const video = await Video.create({ title, url, subjectId });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: "Failed to create video", error });
  }
};

const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;

    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await video.update({ title, url });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Failed to update video", error });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await video.destroy();
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete video", error });
  }
};

module.exports = { getVideos, createVideo, updateVideo, deleteVideo };
