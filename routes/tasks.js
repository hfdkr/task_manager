const express = require("express");
const router = express.Router();
const db = require("../db");

// GET ALL
router.get("/", (req, res) => {
  db.query("SELECT * FROM tasks ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// GET ONE
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM tasks WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "Not found" });
    res.json(results[0]);
  });
});

// CREATE
router.post("/", (req, res) => {
  const { title, description, completed } = req.body;

  db.query(
    "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)",
    [title, description || null, completed || false],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId });
    }
  );
});

// UPDATE
router.patch("/:id", (req, res) => {
  const { title, description, completed } = req.body;

  db.query(
    "UPDATE tasks SET title=?, description=?, completed=? WHERE id=?",
    [title, description, completed, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM tasks WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

module.exports = router;

router.put("/:id", (req, res) => {
  const { title, description } = req.body;

  const sql = `
    UPDATE tasks
    SET title = ?, description = ?
    WHERE id = ?
  `;

  db.query(sql, [title, description, req.params.id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Task updated successfully"
    });
  });
});