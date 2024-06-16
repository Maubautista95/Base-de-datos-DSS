const mongoose = require('mongoose');

const marcaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
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
},
{ typeKey: 'type' }

);

module.exports = mongoose.model('Marca', marcaSchema);
 