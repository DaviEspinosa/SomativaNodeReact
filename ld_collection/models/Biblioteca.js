import mongoose from 'mongoose';


const BibliotecaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  autor: {
    type: String,
    required: false,
  },

  anoPublicacao: {
    type: String,
    required: false,
    min: [1500, 'Ano de publicação não pode ser anterior a 1500.'],  // Validação de intervalo
      max: [new Date().getFullYear(), 'Ano de publicação não pode ser no futuro.'],  // Validação para ano atua
  },

  genero: {
    type: String,
    required: true,
  },

  descricao: {
    type: String,
    required: true,
  },

//   urlImage: {
//     type: String,
//     required: false,
//     validate: {
//       validator: function (v) {
//         return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v);  // Validação para URL de imagem
//       },
//       message: props => `${props.value} não é uma URL de imagem válida.`,
//     },
//   },

//   downloadLink: {
//     type: String,
//     required: false,
//     validate: {
//       validator: function (v) {
//         return /^https?:\/\/.+/.test(v);  // Validação para URL genérica
//       },
//       message: props => `${props.value} não é uma URL de download válida.`,
//     },
//     trim: true,
//   },
});


export default mongoose.models.Biblioteca || mongoose.model('Biblioteca', BibliotecaSchema);