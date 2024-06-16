const mongoose = require('mongoose');

const inventarioItemSchema = new mongoose.Schema({
  serial: {
    type: String,
    required: true,
    unique: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  fechaCompra: {
    type: Date,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  usuarioACargo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  marca: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Marca',
    required: true,
  },
  estadoEquipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EstadoEquipo',
    required: true,
  },
  tipoEquipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TipoEquipo',
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: false, 
  collection: 'inventario-items' 
});

module.exports = mongoose.model('Inventario', inventarioItemSchema);

 