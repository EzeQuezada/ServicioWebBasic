const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const rutaArchivo = './contactos.json';

app.use(express.json());

// Función para leer los contactos desde el archivo
function leerContactos() {
  try {
    const data = fs.readFileSync(rutaArchivo, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Función para guardar los contactos en el archivo
function guardarContactos(contactos) {
  fs.writeFileSync(rutaArchivo, JSON.stringify(contactos, null, 2));
}

// GET /agenda - listar contactos
app.get('/agenda', (req, res) => {
  const contactos = leerContactos();
  res.json(contactos);
});

// POST /agenda - agregar un nuevo contacto
app.post('/agenda', (req, res) => {
  const { nombre, apellido, telefono } = req.body;

  if (!nombre || !apellido || !telefono) {
    return res.status(400).json({ mensaje: 'Faltan datos del contacto' });
  }

  const contactos = leerContactos();
  contactos.push({ nombre, apellido, telefono });
  guardarContactos(contactos);

  res.status(201).json({ mensaje: 'Contacto guardado correctamente' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
