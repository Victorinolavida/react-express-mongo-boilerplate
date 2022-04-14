import jwt from 'jsonwebtoken';
const privatekey = 'bigotes1234';

export const decodeToken = token => {
  let name, uuid;
  jwt.verify(token, privatekey, (err, decode) => {
    if (err) return null;
    name = decode.name;
    uuid = decode.uid;
  });

  return { name, uuid };
};
