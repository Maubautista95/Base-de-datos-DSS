// services/Usuarios.js

const User = require('../models/Usuario');

async function createUser(nombre, email, password, rol) {
  try {
    // Validar los datos de entrada (puedes utilizar una biblioteca como joi o express-validator)
    // ...

    const newUser = new User({
      nombre,
      email,
      password,
      rol,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    // Manejar el error de manera adecuada
    throw error;
  }
}

// Otras funciones relacionadas con usuarios (obtener, actualizar, eliminar, etc.)

module.exports = {
  createUser
};
