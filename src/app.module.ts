import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtModule as JwtServiceModule } from './infra/services/jwt/jwt.module';
import { LoggerModule } from './infra/logger/logger.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { ControllersModule } from './infra/controllers/controllers.module';
import { BcryptModule } from './infra/services/bcrypt/bcrypt.module';
import { EnvironmentConfigModule } from './infra/config/environment-config/environment-config.module';
import { LocalStrategy } from './infra/common/strategies/local.strategy';
import { JwtStrategy } from './infra/common/strategies/jwt.strategy';
import { AuthUseCases } from './usecases/auth/auth-usecase';
import { LoggerService } from './infra/logger/logger.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.secret,
    }),
    LoggerModule,
    ExceptionsModule,
    ControllersModule,
    BcryptModule,
    JwtServiceModule,
    EnvironmentConfigModule,
  ],
  providers: [LocalStrategy, JwtStrategy, AuthUseCases],
})
export class AppModule {}
