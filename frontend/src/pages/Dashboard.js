import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Paper, Typography, CircularProgress } from '@mui/material';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/ingresos/semana');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Paper style={{ padding: 20, margin: '20px auto', maxWidth: 800 }}>
      <Typography variant="h5" gutterBottom>
        Reporte semanal de ingresos
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="cantidad" stroke="#1976d2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default Dashboard;
