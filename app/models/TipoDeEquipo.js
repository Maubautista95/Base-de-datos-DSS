const mongoose = require('mongoose');

const tipoDeEquipoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    enum:['Cómputo', 'Móviles']
  },
  estado: {
    type: String,
    required: true,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
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
  collection: 'tipo-de-equipos' 
});

module.exports = mongoose.model('TipoEquipo', tipoDeEquipoSchema);
 