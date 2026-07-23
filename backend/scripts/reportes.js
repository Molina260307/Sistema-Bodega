const cron = require('node-cron');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./bodega.db');

cron.schedule('0 9 * * 5', () => { // viernes a las 9am
  db.all(`SELECT * FROM ingresos WHERE fecha >= date('now', '-7 days')`, [], (err, rows) => {
    if (err) return console.error(err);

    const reporte = rows.map(r => `${r.fecha} - ${r.proveedor} - ${r.descripcion} (${r.cantidad} ${r.unidad})`).join('\n');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'TU_CORREO@gmail.com',
        pass: 'TU_PASSWORD'
      }
    });

    transporter.sendMail({
      from: 'TU_CORREO@gmail.com',
      to: 'DESTINATARIO@gmail.com',
      subject: 'Reporte semanal de ingresos',
      text: reporte
    }, (error, info) => {
      if (error) console.error(error);
      else console.log('Reporte enviado: ' + info.response);
    });
  });
});
