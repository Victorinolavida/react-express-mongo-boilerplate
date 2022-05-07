import { Router } from 'express';
import { validarJWT } from '../middlewares/ validateJwt';
import { check } from 'express-validator';
import { validateMiddlewere } from '../middlewares/validate';
import { Message } from '../models/message';
import { User } from '../models/usuario';

const routerMessages = Router();

routerMessages.get(
  '/messages/:id',
  [
    check('id', 'no hay id en la petición').notEmpty(),
    check('id', 'El id no es un Id de mongo').isMongoId(),
    validateMiddlewere
  ],
  async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        msg: 'el usuario no existe'
      });
    }

    const messages = await Message.find({ uuid: id });

    res.json({
      total: messages.length,
      messages
    });
  }
);

routerMessages.post(
  '/new',
  [check('text', 'el mensaje no debe estar vacio').notEmpty(), validarJWT, validateMiddlewere],
  async function(req, res) {
    const { text } = req.body;
    const { uid } = req;

    if (text.length < 5) {
      return res.status(400).json({
        msg: 'El texto debe ser mayor a 5 caracteres'
      });
    }

    const msg = new Message({
      uuid: uid,
      text,
      date: new Date()
    });

    const msgSaved = await msg.save();

    res.status(201).json(msgSaved);
  }
);

export default routerMessages;
