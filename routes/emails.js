const express = require("express");
const router = express.Router();
const Email = require("../models/Email");
const UserModel = require("../models/user");
const auth = require("../middleware/auth");

router.post("/send", auth, async (req, res) => {
  const { recipient, subject, message, status } = req.body;

  try {
    const sender = req.user.email;
    const email = new Email({ sender, recipient, subject, message, status });
    await email.save();
    res.json(email);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/inbox", auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const emails = await Email.find({ recipient: user.email });
    res.json(emails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/drafts", auth, async (req, res) => {
  try {
    const drafts = await Email.find({
      sender: req.user.email,
      status: "draft",
    });
    res.json(drafts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
