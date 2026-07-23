const express = require('express');
const router = express.Router();
const db = require('../models/ingreso');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');


// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', upload.single('imagen'), (req, res) => {
  const { fecha, proveedor, descripcion, cantidad, unidad, ubicacion, observaciones, largo, ancho, alto } = req.body;
  const imagen = req.file ? req.file.filename : null;

  // Convertir a número
  const l = parseFloat(largo);
  const a = parseFloat(ancho);
  const h = parseFloat(alto);

  // Si las medidas son mayores a 10, asumimos cm → convertir a metros
  const l_m = l > 10 ? l / 100 : l;
  const a_m = a > 10 ? a / 100 : a;
  const h_m = h > 10 ? h / 100 : h;

  const cbm = (l_m * a_m * h_m).toFixed(3);

  db.run(`INSERT INTO ingresos (fecha, proveedor, descripcion, cantidad, unidad, ubicacion, observaciones, imagen, largo, ancho, alto, cbm)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [fecha, proveedor, descripcion, cantidad, unidad, ubicacion, observaciones, imagen, largo, ancho, alto, cbm],
          err => err ? res.status(500).send(err) : res.send('Ingreso registrado con CBM'));
});

module.exports = router;

router.post('/', upload.array('imagenes', 5), (req, res) => {
  const { fecha, proveedor, descripcion, cantidad, unidad, ubicacion, observaciones, largo, ancho, alto, peso } = req.body;
  const imagenes = req.files ? req.files.map(file => file.filename).join(',') : null;

  // Convertir medidas
  const l = parseFloat(largo);
  const a = parseFloat(ancho);
  const h = parseFloat(alto);

  const l_m = l > 10 ? l / 100 : l;
  const a_m = a > 10 ? a / 100 : a;
  const h_m = h > 10 ? h / 100 : h;

  const cbm = (l_m * a_m * h_m).toFixed(3);

  // Convertir peso a número con decimales
  const pesoKg = parseFloat(peso);

  db.run(`INSERT INTO ingresos (fecha, proveedor, descripcion, cantidad, unidad, ubicacion, observaciones, imagen, largo, ancho, alto, cbm, peso)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [fecha, proveedor, descripcion, cantidad, unidad, ubicacion, observaciones, imagenes, largo, ancho, alto, cbm, pesoKg],
          err => err ? res.status(500).send(err) : res.send('Ingreso registrado con CBM, peso y varias imágenes'));
});


router.get('/semana', (req, res) => {
  db.all(`SELECT * FROM ingresos WHERE fecha >= date('now', '-7 days')`, [], (err, rows) => {
    err ? res.status(500).send(err) : res.json(rows);
  });
});

// Reporte CBM y peso por proveedor
router.get('/reporte-cbm-peso', (req, res) => {
  db.all(`SELECT proveedor, SUM(cbm) as total_cbm, SUM(peso) as total_peso, COUNT(*) as ingresos
          FROM ingresos
          GROUP BY proveedor
          ORDER BY total_cbm DESC`, [], (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(rows);
    }
  });
});



module.exports = router;
