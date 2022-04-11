import jwt from 'jsonwebtoken';
const privatekey = 'bigotes1234';

export const decodeToken = token => {
  let nombre, uid;
  jwt.verify(token, privatekey, (err, decode) => {
    if (err) return null;

    nombre = decode.nombre;
    uid = decode.uid;
  });

  return { nombre, uid };
};
