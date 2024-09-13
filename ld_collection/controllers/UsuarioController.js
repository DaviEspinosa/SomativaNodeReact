
import Usuario from '@/models/Usuario';
import connectMongo from '@/utils/dbConnection';
// import closeConnection from '@/utils/mongodbCloseConnection';


export const getUsuario = async () => {
  await connectMongo();
  return await Usuario.find({});
};


export const createUsuario = async (data) => {
  await connectMongo();
  return await Usuario.create(data);
};


export const updateUsuario = async (id, data) => {
  await connectMongo();
  return await Usuario.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};


export const deleteUsuario = async (id) => {
  await connectMongo();
  return await Usuario.deleteOne({ _id: id });
};
