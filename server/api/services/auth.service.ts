import IAuth from '../interfaces/iauth';
import IDGenerator from '../../common/config/utils';
import { injectable } from 'inversify';
import db from '../../common/collections/index';
import message from '../../common/constants/message';
import { hashPassword, signToken, decodeToken } from '../../common/utils';

@injectable()
class AuthService implements IAuth {
  public async registerUser(data, keys) {
    const {
      firstName,
      lastName,
      email,
      password,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    } = data;

    const _id: string = IDGenerator();
    const findUser = await db.Users.findOne({ email: email });

    if (findUser) throw message.userAlreadyExist;

    const hashPass = await hashPassword(password);
    const accessToken: string = await signToken(_id, keys.publicKey, '10m');
    const refreshToken: string = await signToken(_id, keys.privateKey, '365d');

    const user = new db.Users({
      _id,
      firstName,
      lastName,
      email,
      password: hashPass,
      refreshToken,
    });

    await user.save();

    return {
      _id,
      firstName,
      lastName,
      email,
      accessToken,
      refreshToken,
    };
  }

  public lohinUser(data): object {
    return {};
  }

  public async getAccessToken(data, keys) {
    const { refreshToken } = data;
    const { _id } = await decodeToken(refreshToken, keys.privateKey);
    const findUser = await db.Users.findOne({ _id });

    if (!findUser) throw message.userNotFound;
    if (findUser.refreshToken !== refreshToken) throw message.tokenNotValid;

    const accessToken: string = await signToken(_id, keys.publicKey, '10m');

    return { accessToken, refreshToken };
  }
}

export default AuthService;
