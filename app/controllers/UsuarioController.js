const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt'); 

const crearUsuario = async (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  try {
    await nuevoUsuario.save();
    res.status(201).json({
      mensaje: 'Usuario creado con éxito',
      usuario: nuevoUsuario,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000 && error.keyValue.email) {
      return res.status(400).json({ mensaje: 'El email ya está en uso' });
    }
    res.status(500).json({ mensaje: 'Error al crear el usuario' });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password');
    res.status(200).json({ usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los suarios' });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findById(id).select('-password');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json({ usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el usuario por ID' });
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const actualizaciones = req.body;
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, actualizaciones, { new: true });
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json({ usuario: usuarioActualizado });
  } catch (error) {
    console.error(error);
    if (error.code === 11000 && error.keyValue.email) {
      return res.status(400).json({ mensaje: 'El email ya está en uso' });
    }
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await Usuario.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
