import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  request,
  requestParam,
  response,
} from 'inversify-express-utils';
import SERVICE_IDENTIFIER from '../../../common/constants/identifiers';
import {
  ILogger,
  IMetrics,
  ISecurity,
  JWT_KeyType,
} from '../../../common/interfaces';
import { IAuth } from '../../interfaces';
import { HttpError } from '../../models';
import { ErrorResponseBuilder, HttpStatus } from '../../services';
import { apiResponse } from '../../../common/utils/index';
import message from '../../../common/constants/message';

@controller('/auth')
class authController implements interfaces.Controller {
  public loggerService: ILogger;
  public metricsService: IMetrics;
  public AuthService: IAuth;
  public securityService: ISecurity;

  public constructor(
    @inject(SERVICE_IDENTIFIER.LOGGER) loggerService: ILogger,
    @inject(SERVICE_IDENTIFIER.METRICS) metricsService: IMetrics,
    @inject(SERVICE_IDENTIFIER.AUTH) AuthService: IAuth,
    @inject(SERVICE_IDENTIFIER.SECURITY) securityService: ISecurity
  ) {
    this.loggerService = loggerService;
    this.metricsService = metricsService;
    this.AuthService = AuthService;
    this.securityService = securityService;
  }

  @httpPost('/register')
  public async Auth(@request() req: Request, @response() res: Response) {
    try {
      const privateKey = await this.securityService.getKey(JWT_KeyType.Private);
      const publicKey = await this.securityService.getKey(JWT_KeyType.Public);
      const keys = {
        publicKey,
        privateKey,
      };

      const result = await this.AuthService.registerUser(req.body, keys);
      this.loggerService.logAPITrace(req, res, HttpStatus.OK);
      res
        .status(HttpStatus.OK)
        .json(await apiResponse(true, HttpStatus.OK, message.success, result));
    } catch (err) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json(await apiResponse(false, HttpStatus.BAD_REQUEST, err, {}));
    }
  }

  @httpPost('/accessToken')
  public async getAccessToken(
    @request() req: Request,
    @response() res: Response
  ) {
    try {
      const privateKey = await this.securityService.getKey(JWT_KeyType.Private);
      const publicKey = await this.securityService.getKey(JWT_KeyType.Public);
      const keys = {
        publicKey,
        privateKey,
      };

      const result = await this.AuthService.getAccessToken(req.body, keys);

      res
        .status(HttpStatus.OK)
        .json(await apiResponse(true, HttpStatus.OK, message.success, result));
    } catch (err) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json(await apiResponse(false, HttpStatus.BAD_REQUEST, err, {}));
    }
  }
}

export default authController;
