const express = require("express");
const app = express.Router();

app.use(express.json());


app.get("/", (req, res) => {
    res.json({ msg: "read all products" });
});


app.post("/", (req, res) => {
    res.json({ msg: "add a product" });
});


app.get("/:id", (req, res) => {
    res.json({ msg: `read product with id: ${req.params.id}` });
});


app.put("/:id", (req, res) => {
    res.json({ msg: `update product with id: ${req.params.id}` });
});


app.delete("/:id", (req, res) => {
    res.json({ msg: `delete product with id: ${req.params.id}` });
});

module.exports = app;
