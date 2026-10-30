const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "books.db");
const PORT = process.env.PORT || 3000;
let db = null;

// Open the database first; start the server only after the connection succeeds
const initializeDBAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    await db.exec(`CREATE TABLE IF NOT EXISTS book (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT, author TEXT, price INTEGER, pages INTEGER
    )`);
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

const isValidBook = ({ title, author, price, pages }) =>
  typeof title === "string" && title.trim() !== "" &&
  typeof author === "string" && author.trim() !== "" &&
  Number.isInteger(price) && price >= 0 &&
  Number.isInteger(pages) && pages > 0;

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

// GET all books
app.get("/books/", async (req, res) => {
  try {
    const books = await db.all("SELECT * FROM book ORDER BY id");
    res.status(200).json(books);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET one book
app.get("/books/:bookId/", async (req, res) => {
  try {
    const id = parseId(req.params.bookId);
    if (id === null) return res.status(400).json({ error: "Invalid book id" });
    const book = await db.get("SELECT * FROM book WHERE id = ?", [id]);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST add a book
app.post("/books/", async (req, res) => {
  try {
    if (!isValidBook(req.body || {})) {
      return res.status(400).json({
        error: "title, author (text), price (integer >= 0) and pages (integer > 0) are required",
      });
    }
    const { title, author, price, pages } = req.body;
    const result = await db.run(
      "INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?)",
      [title, author, price, pages]
    );
    res.status(201).json({ message: "Book added successfully", bookId: result.lastID });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update a book
app.put("/books/:bookId/", async (req, res) => {
  try {
    const id = parseId(req.params.bookId);
    if (id === null) return res.status(400).json({ error: "Invalid book id" });
    if (!isValidBook(req.body || {})) {
      return res.status(400).json({
        error: "title, author (text), price (integer >= 0) and pages (integer > 0) are required",
      });
    }
    const { title, author, price, pages } = req.body;
    const result = await db.run(
      "UPDATE book SET title = ?, author = ?, price = ?, pages = ? WHERE id = ?",
      [title, author, price, pages, id]
    );
    if (result.changes === 0) return res.status(404).json({ error: "Book not found" });
    res.status(200).json({ message: "Book updated successfully" });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE a book
app.delete("/books/:bookId/", async (req, res) => {
  try {
    const id = parseId(req.params.bookId);
    if (id === null) return res.status(400).json({ error: "Invalid book id" });
    const result = await db.run("DELETE FROM book WHERE id = ?", [id]);
    if (result.changes === 0) return res.status(404).json({ error: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Unknown paths
app.use((req, res) => res.status(404).json({ error: "Not found" }));
