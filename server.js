const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const DB_FILE = "./db.json";

// helper
const readDB = () => JSON.parse(fs.readFileSync(DB_FILE));
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// GET tagli
app.get("/cuts", (req, res) => {
    const db = readDB();
    res.json(db.cuts);
});

// ADD taglio (admin)
app.post("/cuts", (req, res) => {
    const db = readDB();
    db.cuts.push({ id: Date.now(), ...req.body });
    writeDB(db);
    res.json({ ok: true });
});

// DELETE taglio
app.delete("/cuts/:id", (req, res) => {
    const db = readDB();
    db.cuts = db.cuts.filter(c => c.id != req.params.id);
    writeDB(db);
    res.json({ ok: true });
});

// GET prenotazioni
app.get("/bookings", (req, res) => {
    const db = readDB();
    res.json(db.bookings);
});

// CREA prenotazione
app.post("/bookings", (req, res) => {
    const db = readDB();
    db.bookings.push({ id: Date.now(), ...req.body });
    writeDB(db);
    res.json({ ok: true });
});

app.listen(3000, () => console.log("Server attivo su http://localhost:3000"));
