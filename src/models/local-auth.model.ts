import { model, Schema } from 'mongoose';
import { CoreDocument } from '../types/model.type';
import { EmailValidator } from '../validators';

const LocalAuthSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 12
    },
    password: {
      //利用salt和hash來做加密
      salt: {
        type: String,
        required: true
      },
      hash: {
        type: String,
        required: true
      }
    },
    email: {
      type: String,
      required: true,
      //validate辦法？
      validate: {
        validator: EmailValidator
      }
    }
  }
);
//利用interface設置驗證機制
export interface LocalAuthDocument extends CoreDocument {
  username: string;
  password: {
    salt: string;
    hash: string;
  };
  email: string;
}

export const LocalAuthModel = model<LocalAuthDocument>('User', LocalAuthSchema);