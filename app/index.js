require('dotenv').config({ path: './App/.env' }); // Especifica la ruta al archivo .env

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/router');

// Configurar la conexión a MongoDB
const mongoDB = process.env.MONGODB_URI;

if (!mongoDB) {
  console.error('Error: La variable de entorno MONGODB_URI no está definida.');
  process.exit(1);
}

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('Error de conexión a MongoDB:', err);
  });

// Middlewares para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registrar el router para las rutas de la API
app.use('/api', routes);

// Manejador de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
