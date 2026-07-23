import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ReporteCBM = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/ingresos/reporte-cbm');
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Paper style={{ padding: 20, margin: '20px auto', maxWidth: 800 }}>
      <Typography variant="h5" gutterBottom>
        Reporte de CBM por Proveedor
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Proveedor</strong></TableCell>
              <TableCell align="right"><strong>Total CBM</strong></TableCell>
              <TableCell align="right"><strong>Ingresos</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.proveedor}</TableCell>
                <TableCell align="right">{row.total_cbm}</TableCell>
                <TableCell align="right">{row.ingresos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ReporteCBM;
