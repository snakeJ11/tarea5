const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json())
const PORT = 3000;

// Ruta para obtener datos de la API externa
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('http://www.raydelto.org/agenda.php');
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener datos de la API:', error.message);
    res.status(500).json({ error: 'Error al obtener datos de la API' });
  }
});

// Ruta para enviar datos a la API externa mediante una solicitud POST
app.post('/api/insert', async (req, res) => {
  try {
    const postData = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
    };

    // Realizar una solicitud POST a la API externa
    const response = await axios.post('http://www.raydelto.org/agenda.php', postData);

    // Enviar los datos de la API externa como respuesta
    res.json(response.data);
  } catch (error) {
    console.error('Error al enviar datos a la API:', error.message);
    res.status(500).json({ error: 'Error al enviar datos a la API' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});
