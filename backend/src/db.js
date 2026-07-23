// Importar better-sqlite3
const Database = require('better-sqlite3');

// Abrir la base de datos (archivo bodega.db está en backend)
const db = new Database('../bodega.db');





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
