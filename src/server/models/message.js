import { model, Schema } from 'mongoose';

const messageSchema = Schema({
  uuid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    required: true,
    type: String
  },
  date: {
    type: Number,
    required: true
  }
});

export const Message = model('Message,', messageSchema);
