const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
  },
  rol: {
    type: String,
    required: true,
    enum: ['administrador', 'docente'],
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
});

usuarioSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Usuario', usuarioSchema);
 