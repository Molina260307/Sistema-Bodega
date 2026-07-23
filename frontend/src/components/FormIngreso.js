import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Paper } from '@mui/material';

const FormIngreso = () => {
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    if (file) data.append('imagen', file);

    await api.post('/ingresos', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('Ingreso registrado con imagen');
  };

  return (
    <Paper style={{ padding: 20, maxWidth: 500, margin: '20px auto' }}>
      <form onSubmit={handleSubmit}>
        <TextField label="Fecha" type="date" name="fecha" onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField label="Proveedor" name="proveedor" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Descripción" name="descripcion" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Cantidad" type="number" name="cantidad" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Unidad" name="unidad" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Ubicación" name="ubicacion" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Observaciones" name="observaciones" onChange={handleChange} fullWidth margin="normal" multiline rows={3} />
        <TextField label="Largo" name="largo" type="number" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Ancho" name="ancho" type="number" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Alto" name="alto" type="number" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Peso (kg)" name="peso" type="number" step="0.01" onChange={handleChange} fullWidth margin="normal" />


        <input type="file" name="imagenes" multiple onChange={handleFileChange} />

        <Button type="submit" variant="contained" color="primary">Registrar</Button>
      </form>
    </Paper>
  );
};

export default FormIngreso;
