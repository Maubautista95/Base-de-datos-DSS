const express = require('express');
const router = express.Router();
const authService = require('../services/Auth');
const usuarioController = require('../controllers/usuarioController');

// Controladores
const inventarioItemController = require('../controllers/InventarioItemController');
const tipoDeEquipoController = require('../controllers/tipoDeEquipoController');
const estadoEquipoController = require('../controllers/estadoEquipoController');
const marcaController = require('../controllers/marcaController');

// Rutas para autenticación
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.authenticateUser(email, password);
  if (result.error) {
    return res.status(401).json({ message: result.error });
  }
  res.json({ token: result.token });
});

// Aplicamos el middleware de autenticación a todas las rutas excepto /login y /auth
router.use(authService.authenticateExceptLogin);

// Función para verificar si el usuario es administrador o docente
function isAdminOrDocente(req, res, next) {
  if (req.user.rol === 'administrador' || req.user.rol === 'docente') {
    next();
  } else {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
}

// Rutas para usuarios (solo para administradores)
router.post('/usuarios', authService.isAdmin, usuarioController.crearUsuario);
router.get('/usuarios', authService.isAdmin, usuarioController.obtenerUsuarios);
router.get('/usuarios/:id', authService.isAdmin, usuarioController.obtenerUsuarioPorId);
router.put('/usuarios/:id', authService.isAdmin, usuarioController.actualizarUsuario);
router.delete('/usuarios/:id', authService.isAdmin, usuarioController.eliminarUsuario);

// Rutas para InventarioItem (disponibles para administradores y docentes)
router.post('/inventario-items', inventarioItemController.verificarRol, inventarioItemController.crearInventarioItem);
router.get('/inventario-items', inventarioItemController.verificarRol, inventarioItemController.obtenerInventarioItems);
router.get('/inventario-items/:id', inventarioItemController.verificarRol, inventarioItemController.obtenerInventarioItemPorId);
router.put('/inventario-items/:id', inventarioItemController.verificarRol, inventarioItemController.actualizarInventarioItem);
router.delete('/inventario-items/:id', inventarioItemController.verificarRol, inventarioItemController.eliminarInventarioItem);

// Rutas para TipoDeEquipo (solo para administradores)
router.post('/tipos-de-equipo', authService.isAdmin, tipoDeEquipoController.crearTipoDeEquipo);
router.get('/tipos-de-equipo', authService.isAdmin, tipoDeEquipoController.obtenerTiposDeEquipo);
router.get('/tipos-de-equipo/:id', authService.isAdmin, tipoDeEquipoController.obtenerTipoDeEquipoPorId);
router.put('/tipos-de-equipo/:id', authService.isAdmin, tipoDeEquipoController.actualizarTipoDeEquipo);
router.delete('/tipos-de-equipo/:id', authService.isAdmin, tipoDeEquipoController.eliminarTipoDeEquipo);

// Rutas para EstadoEquipo (solo para administradores)
router.post('/estados-equipo', authService.isAdmin, estadoEquipoController.crearEstadoEquipo);
router.get('/estados-equipo', authService.isAdmin, estadoEquipoController.obtenerEstadosEquipo);
router.get('/estados-equipo/:id', authService.isAdmin, estadoEquipoController.obtenerEstadoEquipoPorId);
router.put('/estados-equipo/:id', authService.isAdmin, estadoEquipoController.actualizarEstadoEquipo);
router.delete('/estados-equipo/:id', authService.isAdmin, estadoEquipoController.eliminarEstadoEquipo);

// Rutas para Marca (solo para administradores)
router.post('/marcas/', authService.isAdmin, marcaController.crearMarca);
router.get('/marcas', authService.isAdmin, marcaController.obtenerMarcas);
router.get('/marcas/:id', authService.isAdmin, marcaController.obtenerMarcaPorId);
router.put('/marcas/:id', authService.isAdmin, marcaController.actualizarMarca);
router.delete('/marcas/:id', authService.isAdmin, marcaController.eliminarMarca);

module.exports = router;
