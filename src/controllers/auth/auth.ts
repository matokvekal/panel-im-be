import HTTP_STATUS from 'http-status-codes';
import JWT from 'jsonwebtoken';
import { Context } from 'koa';//interface to access to requests and params

import { firstLetterUppercase } from '../../helpers/helpers';
import { UserModel } from '../../models/user/User.model';

export class Auth {//creating and login users
  public async create(ctx: Context): Promise<void> {
    try {
      const { username, password, role } = ctx.request.body;//get data from request body
      const user = await UserModel.findOne({ username: firstLetterUppercase(username) });//mongoos method
      if (user) {
        ctx.response.status = HTTP_STATUS.CONFLICT;//409 
        ctx.body = { message: 'Username already exist' };//at express its ctx.json
      } else {
        const body = {
          username: firstLetterUppercase(username),
          password,
          role
        };

        const createdUser = await UserModel.create(body);
        const userData = {//this data is addedto the token
          id: createdUser._id,//auto generate id
           username: createdUser.username
          };
        // const token = JWT.sign({ data: userData }, 'testsecret', {});
         //ctx.body = { message: 'User created successfully', token };
         ctx.body=createdUser;
      }
    } catch (error) {
      console.log(error);
      ctx.body = error;
    }
  }


}
