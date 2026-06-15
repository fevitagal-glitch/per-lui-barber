const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const DB_FILE = "./db.json";

const readDB = () => JSON.parse(fs.readFileSync(DB_FILE));
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

app.get("/cuts", (req, res) => {
    const db = readDB();
    res.json(db.cuts);
});

app.post("/cuts", (req, res) => {
    const db = readDB();
    db.cuts.push({ id: Date.now(), ...req.body });
    writeDB(db);
    res.json({ ok: true });
});

app.delete("/cuts/:id", (req, res) => {
    const db = readDB();
    db.cuts = db.cuts.filter(c => c.id != req.params.id);
    writeDB(db);
    res.json({ ok: true });
});

app.get("/bookings", (req, res) => {
    const db = readDB();
    res.json(db.bookings);
});

app.post("/bookings", (req, res) => {
    const db = readDB();

    db.bookings.push({
        id: Date.now(),
        name: req.body.name,
        cut: req.body.cut,
        time: req.body.time
    });

    writeDB(db);
    res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server attivo"));
