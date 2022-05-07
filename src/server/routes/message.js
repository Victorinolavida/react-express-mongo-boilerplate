import { Router } from 'express';
import { validarJWT } from '../middlewares/ validateJwt';
import { check } from 'express-validator';
import { validateMiddlewere } from '../middlewares/validate';
import { getMessageByUserId, postMsg } from '../controller/message';

const routerMessages = Router();

routerMessages.get(
  '/messages/:id',
  [
    check('id', 'no hay id en la petición').notEmpty(),
    check('id', 'El id no es un Id de mongo').isMongoId(),
    validateMiddlewere
  ],
  getMessageByUserId
);

routerMessages.post(
  '/new',
  [check('text', 'el mensaje no debe estar vacio').notEmpty(), validarJWT, validateMiddlewere],
  postMsg
);

export default routerMessages;
