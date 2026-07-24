const express = require('express');
const app = express();
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const db = require('./db');

const ingresosRouter = require('./routes/ingresos');

// Middleware
app.use(express.json());
// 👇 ESTA ES LA LÍNEA QUE FALTABA
app.use(express.urlencoded({ extended: true }));

// Montar las rutas
app.use('/ingresos', ingresosRouter);

// Ruta raíz para probar que el servidor funciona
app.get('/', (req, res) => {
  res.send('✅ API Sistema Bodega funcionando. Usa /ingresos para ver datos.');
});
