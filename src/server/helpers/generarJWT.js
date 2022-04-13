import jwt from 'jsonwebtoken';

export const generarJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_WORD,
      {
        expiresIn: '4h'
      },
      (err, token) => {
        if (err) {
          console.log(err);
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('No se pudo generar el token');
        }

        resolve(token);
      }
    );
  });
};
