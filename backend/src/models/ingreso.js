const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bodega.db');

db.run(`CREATE TABLE IF NOT EXISTS ingresos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha TEXT,
  proveedor TEXT,
  descripcion TEXT,
  cantidad INTEGER,
  unidad TEXT,
  ubicacion TEXT,
  observaciones TEXT
)`);

module.exports = db;
