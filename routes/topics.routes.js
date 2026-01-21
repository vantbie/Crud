const express = require("express");

const {getAllTopics, createTopic, voteTopic, deleteTopic, editTopic, updateTopic} = require("../controllers/topics.controller");

const { render } = require("ejs");

const router = express.Router();

router.get("/", getAllTopics);
router.post("/", createTopic);
router.post("/:id/vote", voteTopic);
router.post("/:id/delete", deleteTopic);
router.get("/:id/edit", editTopic);
router.post("/:id/update", updateTopic);

module.exports = router;
