import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { AuthUseCases } from 'src/usecases/auth/auth-usecase';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly loginUseCaseProxy: AuthUseCases,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    if (!username || !password) {
      this.logger.warn(
        'LocalStrategy',
        `Username or password is missing, BadRequestException`,
      );
      this.exceptionService.UnauthorizedException();
    }
    const user = await this.loginUseCaseProxy.validateUserForLocalStrategy(
      username,
      password,
    );
    if (!user) {
      this.logger.warn('LocalStrategy', `Invalid username or password`);
      this.exceptionService.UnauthorizedException({
        message: 'Invalid username or password.',
      });
    }
    return user;
  }
}
