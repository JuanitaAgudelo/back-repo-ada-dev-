import mongoose from 'mongoose';
const { Schema, model } = mongoose;
// import { Enum_Rol, Enum_EstadoUsuario } from '../enums/enums';

// interface User {
//   correo: string;
//   identificacion: string;
//   nombre: string;
//   apellido: string;
//   rol: Enum_Rol;
//   estado: Enum_EstadoUsuario;
// }

const userSchema = new Schema({
  correo: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      // (email) => {
      //   if (email.includes('@') && email.includes('.')) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // },
      message: 'El formato del correo electrónico está malo.',
    },
  },
  identificacion: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    enum: ['ESTUDIANTE', 'LIDER', 'ADMINISTRADOR'],
  },
  estado: {
    type: String,
    enum: ['PENDIENTE', 'AUTORIZADO', 'NO_AUTORIZADO'],
    default: 'PENDIENTE',
  },
},
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);



userSchema.virtual('proyectos',{
  ref:'Proyecto',
  localField: '_id',
  foreignField: 'lider',
});

userSchema.virtual('inscripciones',{
  ref:'Inscripcion',
  localField: '_id',
  foreignField: 'estudiante',
});


userSchema.virtual('avances',{
  ref:'Avance',
  localField: '_id',
  foreignField: 'creadoPor',
});

const UserModel = model('User', userSchema);

export { UserModel };