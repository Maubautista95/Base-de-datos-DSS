const TipoDeEquipo = require('../models/TipoDeEquipo');

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

const crearTipoDeEquipo = async (req, res) => {
  const nuevoTipoDeEquipo = new TipoDeEquipo(req.body);
  try {
    await nuevoTipoDeEquipo.save();
    res.status(201).json({
      mensaje: 'TipoDeEquipo creado con éxito',
      tipoDeEquipo: nuevoTipoDeEquipo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el tipo de equipo' });
  }
};

const obtenerTiposDeEquipo = async (req, res) => {
  try {
    const tiposDeEquipo = await TipoDeEquipo.find();
    res.status(200).json({ tiposDeEquipo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los tipos de equipo' });
  }
};

const obtenerTipoDeEquipoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoDeEquipo = await TipoDeEquipo.findById(id);
    if (!tipoDeEquipo) {
      return res.status(404).json({ mensaje: 'Tipo de equipo no encontrado' });
    }
    res.status(200).json({ tipoDeEquipo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el tipo de equipo por ID' });
  }
};

const actualizarTipoDeEquipo = async (req, res) => {
  const { id } = req.params;
  const actualizaciones = req.body;
  try {
    const tipoDeEquipoActualizado = await TipoDeEquipo.findByIdAndUpdate(id, actualizaciones, { new: true });
    if (!tipoDeEquipoActualizado) {
      return res.status(404).json({ mensaje: 'Tipo de equipo no encontrado' });
    }
    res.status(200).json({ tipoDeEquipo: tipoDeEquipoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el tipo de equipo' });
  }
};

const eliminarTipoDeEquipo = async (req, res) => {
  const { id } = req.params;
  try {
    await TipoDeEquipo.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Tipo de equipo eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el tipo de equipo' });
  }
};

module.exports = {
  crearTipoDeEquipo,
  obtenerTiposDeEquipo,
  obtenerTipoDeEquipoPorId,
  actualizarTipoDeEquipo,
  eliminarTipoDeEquipo,
  verificarRol,
};
