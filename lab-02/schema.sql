CREATE TABLE IF NOT EXISTS book (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  author TEXT,
  price INTEGER,
  pages INTEGER
);

INSERT INTO book (title, author, price, pages) VALUES
('The Alchemist', 'Paulo Coelho', 250, 208),
('Wings of Fire', 'A. P. J. Abdul Kalam', 300, 180),
('The Guide', 'R. K. Narayan', 280, 240),
('Train to Pakistan', 'Khushwant Singh', 220, 181),
('The White Tiger', 'Aravind Adiga', 350, 321),
('Malgudi Days', 'R. K. Narayan', 199, 256),
('The God of Small Things', 'Arundhati Roy', 399, 340),
('Godan', 'Munshi Premchand', 180, 330),
('Gitanjali', 'Rabindranath Tagore', 150, 120),
('Midnight''s Children', 'Salman Rushdie', 450, 536);
