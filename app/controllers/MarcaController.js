const Marca = require('../models/Marca');

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

const crearMarca = async (req, res) => {
  console.log('Creando nueva marca:', req.body);

  const nuevaMarca = new Marca(req.body);
  try {
    await nuevaMarca.save();
    console.log('Marca creada con éxito:', nuevaMarca);
    res.status(201).json({
      mensaje: 'Marca creada con éxito',
      marca: nuevaMarca,
    });
  } catch (error) {
    console.error('Error al crear marca:', error);
    res.status(500).json({ mensaje: 'Error al crear Marca' });
  }
};

const obtenerMarcas = async (req, res) => {
  try {
    console.log('Obteniendo todas las marcas');

    const marcas = await Marca.find();
    console.log('Marcas obtenidas:', marcas);
    res.status(200).json({ marcas });
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    res.status(500).json({ mensaje: 'Error al obtener las marcas' });
  }
};

const obtenerMarcaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    console.log('Obteniendo marca por ID:', id);

    const marca = await Marca.findById(id);
    if (!marca) {
      return res.status(404).json({ mensaje: 'Marca no encontrada' });
    }
    console.log('Marca encontrada:', marca);
    res.status(200).json({ marca });
  } catch (error) {
    console.error('Error al obtener marca por ID:', error);
    res.status(500).json({ mensaje: 'Error al obtener Marca por ID' });
  }
};

const actualizarMarca = async (req, res) => {
  const { id } = req.params;
  const actualizaciones = req.body;
  try {
    console.log('Actualizando marca con ID:', id);

    const marcaActualizada = await Marca.findByIdAndUpdate(id, actualizaciones, { new: true });
    if (!marcaActualizada) {
      return res.status(404).json({ mensaje: 'Marca no encontrada' });
    }
    console.log('Marca actualizada:', marcaActualizada);
    res.status(200).json({ marca: marcaActualizada });
  } catch (error) {
    console.error('Error al actualizar marca:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la marca' });
  }
};

const eliminarMarca = async (req, res) => {
  const { id } = req.params;
  try {
    console.log('Eliminando marca con ID:', id);

    await Marca.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Marca eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar marca:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la marca' });
  }
};

module.exports = {
  crearMarca,
  obtenerMarcas,
  obtenerMarcaPorId,
  actualizarMarca,
  eliminarMarca,
  verificarRol,
};
