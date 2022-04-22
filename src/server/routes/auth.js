import { Router } from 'express';
import { check } from 'express-validator';
import { login, registro } from '../controller/auth';
import { generarJWT } from '../helpers/generarJWT';
import { validateMiddlewere } from '../middlewares/validate'
import { validarJWT } from '../middlewares/ validateJwt';

const router = Router();

router.post(
  '/registro',
  [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validateMiddlewere
  ],
  registro
);

router.post(
  '/login',
  [
    check('email', 'El email es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    validateMiddlewere
  ],
  login
);

router.get('/renew', validarJWT, async (req, res) => {
  const name = req.name;
  const uid = req.uid;
  const token = await generarJWT(uid, name);
  res.json({ token, ok: true });
});

export default router;
