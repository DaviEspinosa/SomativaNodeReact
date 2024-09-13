// /models/Usuario.js
import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
//   favoritos: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Biblioteca',
//   }],
});

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);
