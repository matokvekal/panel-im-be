import { compare, hash } from 'bcryptjs';
import mongoose from 'mongoose';

import { IUser } from './../../interface/user.interface';

const userSchema: mongoose.Schema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  role: { type: String },
  date: { type: Date, default: Date.now },
  // tickets: [{
  //   ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }
  // }],
});

userSchema.pre('save', async function(this: IUser, next) { //save is the hook
  const hashedpassword = await hash(this.password, 10);//10 is the length
  this.password = hashedpassword;
  next();


});
//if password match return True
userSchema.methods.comparePassword = function(password: string): Promise<boolean> {
  const hashedPassword: string = (this as IUser).password;
  return compare(password, hashedPassword);
}

export { userSchema };
