const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bodega.db');

// Crear tabla si no existe
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ingresos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT,
    proveedor TEXT,
    descripcion TEXT,
    cantidad REAL,
    unidad TEXT,
    ubicacion TEXT,
    observaciones TEXT,
    imagen TEXT,
    largo REAL,
    ancho REAL,
    alto REAL,
    cbm REAL,
    peso REAL   -- 👈 nuevo campo para peso en kg con decimales
  )`);
});

module.exports = db;
