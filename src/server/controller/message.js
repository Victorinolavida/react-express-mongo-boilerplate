import { User } from '../models/usuario';
import { Message } from '../models/message';



export const getMessageByUserId =  async (req, res) => {
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

export const postMsg = async function(req, res) {
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