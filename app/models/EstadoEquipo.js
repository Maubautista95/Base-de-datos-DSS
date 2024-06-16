const mongoose = require('mongoose');
 
const estadoEquipoSchema = new mongoose.Schema({
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
  
}, {
  timestamps: false, 
  collection: 'estados-equipo' 
}
);

module.exports = mongoose.model('EstadoEquipo', estadoEquipoSchema);
