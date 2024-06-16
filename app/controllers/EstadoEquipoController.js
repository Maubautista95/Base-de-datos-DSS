const EstadoEquipo = require('../models/EstadoEquipo');

function verificarRol(req, res, next) {
  const { rol } = req.user;

  if (rol === 'administrador') {
    // Permitir todas las operaciones para administradores
    next();
  } else {
    // Denegar acceso para otros roles
    return res.status(403).json({ message: 'Acceso denegado' });
  }
}

const crearEstadoEquipo = async (req, res) => {
  const nuevoEstadoEquipo = new EstadoEquipo(req.body);
  try {
    await nuevoEstadoEquipo.save();
    res.status(201).json({
      mensaje: 'EstadoEquipo creado con éxito',
      estadoEquipo: nuevoEstadoEquipo,
    });
  } catch (error) {
    console.error(error);
    // Manejar errores de Mongo (ej. nombre duplicado)
    if (error.code === 11000 && error.keyValue.nombre) {
      return res.status(400).json({ mensaje: 'El nombre ya está en uso' });
    }
    res.status(500).json({ mensaje: 'Error al crear EstadoEquipo' });
  }
};

const obtenerEstadosEquipo = async (req, res) => {
  try {
    const estadosEquipo = await EstadoEquipo.find();
    res.status(200).json({ estadosEquipo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener Estados de equipo' });
  }
};

const obtenerEstadoEquipoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const estadoEquipo = await EstadoEquipo.findById(id);
    if (!estadoEquipo) {
      return res.status(404).json({ mensaje: 'Estado de equipo no encontrado' });
    }
    res.status(200).json({ estadoEquipo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener Estado de equipo por ID' });
  }
};

const actualizarEstadoEquipo = async (req, res) => {
  const { id } = req.params;
  const actualizaciones = req.body;
  try {
    const estadoEquipoActualizado = await EstadoEquipo.findByIdAndUpdate(id, actualizaciones, { new: true });
    if (!estadoEquipoActualizado) {
      return res.status(404).json({ mensaje: 'Estado de equipo no encontrado' });
    }
    res.status(200).json({ estadoEquipo: estadoEquipoActualizado });
  } catch (error) {
    console.error(error);
    // Manejar errores de Mongo (ej. nombre duplicado)
    if (error.code === 11000 && error.keyValue.nombre) {
      return res.status(400).json({ mensaje: 'El nombre ya está en uso' });
    }
    res.status(500).json({ mensaje: 'Error al actualizar EstadoEquipo' });
  }
};

const eliminarEstadoEquipo = async (req, res) => {
  const { id } = req.params;
  try {
    await EstadoEquipo.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Estado de equipo eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar Estado de equipo' });
  }
};

module.exports = {
  crearEstadoEquipo,
  obtenerEstadosEquipo,
  obtenerEstadoEquipoPorId,
  actualizarEstadoEquipo,
  eliminarEstadoEquipo,
  verificarRol,
};
