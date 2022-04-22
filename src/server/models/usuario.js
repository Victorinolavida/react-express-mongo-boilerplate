import { Schema, model } from 'mongoose';

const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'el nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'el correo es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'la contraseña es obligatoria']
  }
});

export const User = model('User', userSchema);
