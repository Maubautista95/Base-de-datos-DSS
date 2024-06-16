const InventarioItem = require('../models/InventarioItem');

function verificarRol(req, res, next) {
  const { rol } = req.user;

  if (rol === 'administrador') {
    // Permitir todas las operaciones para administradores
    next();
  } else if (rol === 'docente') {
    // Permitir solo la operación de listado para docentes
    if (req.method === 'GET') {
      next();
    } else {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
  } else {
    // Denegar acceso para otros roles
    return res.status(403).json({ message: 'Acceso denegado' });
  }
}

const crearInventarioItem = async (req, res) => {
  const nuevoInventarioItem = new InventarioItem(req.body);
  try {
    await nuevoInventarioItem.save();
    res.status(201).json({
      mensaje: 'InventarioItem creado con éxito',
      inventarioItem: nuevoInventarioItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear item de inventario' });
  }
};

const obtenerInventarioItems = async (req, res) => {
  try {
    const inventarioItems = await InventarioItem.find();
    res.status(200).json({ inventarioItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los items del inventario' });
  }
};

const obtenerInventarioItemPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const inventarioItem = await InventarioItem.findById(id);
    if (!inventarioItem) {
      return res.status(404).json({ mensaje: 'Item de inventario no encontrado' });
    }
    res.status(200).json({ inventarioItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener item de inventario por ID' });
  }
};

const actualizarInventarioItem = async (req, res) => {
  const { id } = req.params;
  const actualizaciones = req.body;
  try {
    const inventarioItemActualizado = await InventarioItem.findByIdAndUpdate(id, actualizaciones, { new: true });
    if (!inventarioItemActualizado) {
      return res.status(404).json({ mensaje: 'Item de inventario no encontrado' });
    }
    res.status(200).json({ inventarioItem: inventarioItemActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar item de inventario' });
  }
};

const eliminarInventarioItem = async (req, res) => {
  const { id } = req.params;
  try {
    await InventarioItem.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Item de inventario eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar item del inventario' });
  }
};

module.exports = {
  crearInventarioItem,
  obtenerInventarioItems,
  obtenerInventarioItemPorId,
  actualizarInventarioItem,
  eliminarInventarioItem,
  verificarRol,
};
