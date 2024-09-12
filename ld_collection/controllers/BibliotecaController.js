
import Biblioteca from '@/models/Biblioteca';
import connectMongo from '@/utils/dbConnection';
// import closeConnection from '@/utils/mongodbCloseConnection';


export const getBiblioteca = async () => {
  await connectMongo();
  return await Biblioteca.find({});
};


export const createBiblioteca = async (data) => {
  await connectMongo();
  return await Biblioteca.create(data);
};


export const updateBiblioteca = async (id, data) => {
  await connectMongo();
  return await Biblioteca.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};


export const deleteBiblioteca = async (id) => {
  await connectMongo();
  return await Biblioteca.deleteOne({ _id: id });
};
