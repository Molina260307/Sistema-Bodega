const express = require('express');
const app = express();
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const db = require('./db');
const ingresosRouter = require('./routes/ingresos');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


app.use(express.json());
app.use('/ingresos', ingresosRouter);

// Configuración de correo
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // si usas Outlook corporativo
  port: 587,
  secure: false,
  auth: {
    user: "bodegas@expotransportesg.com", // tu correo
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
      to: ['cgarcia@expotransportesg.com', 'sramirez@expotransportesg.com'], // tus jefes
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

app.listen(5000, () => {
  console.log('Servidor corriendo en puerto 5000');
});
