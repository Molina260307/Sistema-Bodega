const express = require('express');
const app = express();
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const db = require('./db');

const ingresosRouter = require('./routes/ingresos');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/ingresos', ingresosRouter);
// Ruta raíz para probar que el servidor funciona
app.get('/', (req, res) => {
  res.send('✅ API Sistema Bodega funcionando. Usa /ingresos para ver datos.');
});


// Configuración de correo
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "bodegas@expotransportesg.com",
    pass: "Bodega2026#"
  }
});

// Función para generar reporte
function generarReporte(callback) {
  db.all(`SELECT proveedor, SUM(cbm) as total_cbm, SUM(peso) as total_peso, COUNT(*) as ingresos
          FROM ingresos
          GROUP BY proveedor
          ORDER BY total_cbm DESC`, [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      let reporte = '📊 Reporte semanal de ingresos:\n\n';
      rows.forEach(r => {
        reporte += `Proveedor: ${r.proveedor}\nTotal CBM: ${r.total_cbm}\nTotal Peso: ${r.total_peso} kg\nIngresos: ${r.ingresos}\n\n`;
      });
      callback(null, reporte);
    }
  });
}

// Cron job → jueves a las 16:00
cron.schedule('0 16 * * 4', () => {
  generarReporte((err, reporte) => {
    if (err) return console.error(err);

    transporter.sendMail({
      from: 'bodegas@expotransportesg.com',
      to: ['cgarcia@expotransportesg.com', 'sramirez@expotransportesg.com'],
      subject: 'Reporte semanal de ingresos',
      text: reporte
    }, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Reporte enviado: ' + info.response);
      }
    });
  });
});

// Solo una vez se arranca el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
