import { model, Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  refreshToken: string;
  isActive: boolean;
  isDeleted: boolean;
}

const UserSchema: any = new Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    refreshToken: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Users: Model<IUser> = model('Users', UserSchema, 'Users');

export default Users;
export { IUser };
