import mongoose from 'mongoose';
import { EmailValidator } from '../../validators';

export const UserSchema = new mongoose.Schema(
  {
    //typescript可以看到有哪些屬性可以填
    username: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 16
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: EmailValidator
      }
    }
  }
);