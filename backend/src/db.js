const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bodega.db');


// Crear tabla ingresos si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS ingresos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT,
    proveedor TEXT,
    descripcion TEXT,
    cantidad INTEGER,
    unidad TEXT,
    ubicacion TEXT,
    observaciones TEXT,
    imagen TEXT,
    largo REAL,
    ancho REAL,
    alto REAL,
    cbm REAL,
    peso REAL
  )
`).run();

module.exports = db;
