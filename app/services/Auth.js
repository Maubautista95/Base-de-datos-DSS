const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

async function authenticateUser(email, password) {
  try {
    if (typeof email !== 'string') {
      return { error: 'El correo electrónico debe ser una cadena de texto' };
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return { error: 'Usuario no encontrado' };
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return { error: 'Contraseña incorrecta' };
    }

    const payload = {
      id: usuario._id,
      email: usuario.email,
      rol: usuario.rol,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return { token };
  } catch (error) {
    return { error: 'Error en la autenticación' };
  }
}

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    rol: user.rol,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}

function authenticateExceptLogin(req, res, next) {
  if (req.path === '/login' || req.path === '/auth') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token de autenticación inválido' });
  }
}

function isAdmin(req, res, next) {
  if (req.user && req.user.rol === 'administrador') {
    return next();
  }
  return res.status(403).json({ message: 'Acceso denegado: Solo administradores' });
}

function isDocente(req, res, next) {
  if (req.user && req.user.rol === 'docente') {
    return next();
  }
  return res.status(403).json({ message: 'Acceso denegado: Solo docentes' });
}

module.exports = {
  authenticateUser,
  generateToken,
  authenticateExceptLogin,
  isAdmin,
  isDocente,
};
