const Database = require('better-sqlite3');

// Abre o crea la base de datos
const db = new Database('./bodega.db');

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
