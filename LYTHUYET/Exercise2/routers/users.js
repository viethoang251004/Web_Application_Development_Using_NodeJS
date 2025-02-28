const express = require("express");
const app = express.Router();

app.use(express.json());


app.get("/", (req, res) => {
    res.json({ msg: "read all users" });
});


app.post("/", (req, res) => {
    res.json({ msg: "add a user" });
});


app.get("/:id", (req, res) => {
    res.json({ msg: `read user with id: ${req.params.id}` });
});


app.put("/:id", (req, res) => {
    res.json({ msg: `update user with id: ${req.params.id}` });
});


app.delete("/:id", (req, res) => {
    res.json({ msg: `delete user with id: ${req.params.id}` });
});

module.exports = app;
