import { User } from '../models/usuario';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generarJWT';

export const registro = async (req, res) => {
  const { name, email, password1, password2 } = req.body;

  if (name.length < 3) {
    return res.status(401).json({
      msg: `El nombre debe ser mayor a tres caracteres`
    });
  }

  const userInDb = await User.findOne({ email });

  if (userInDb) {
    return res.status(401).json({
      msg: `Ya existe un usuario con el email ${email}`
    });
  }

  if (password1.length <= 5) {
    return res.status(401).json({
      msg: 'El password debe ser de al menos 6 caracteres'
    });
  }

  if (password1 !== password2) {
    return res.status(401).json({
      msg: 'el password no coincide'
    });
  }
  // encriptanto contraseña
  const salt = bcryptjs.genSaltSync();

  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password1, salt)
  });

  await newUser.save();

  const token = await generarJWT(newUser._id, newUser.nombre);
  return res.json({ token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const userDB = await User.findOne({ email });

  if (!userDB) {
    return res.status(401).json({
      msg: 'Email o password no son correctos'
    });
  }

  const validPassword = bcryptjs.compareSync(password, userDB.password);

  if (!validPassword) {
    return res.status(401).json({
      msg: 'Email o password no son correctos'
    });
  }
  const token = await generarJWT(userDB._id, userDB.name);

  res.json({ token });
};
