import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthUseCases } from 'src/usecases/auth/auth-usecase';

@Module({
  imports: [AuthUseCases],
  providers: [AuthUseCases],
  controllers: [AuthController],
})
export class ControllersModule {}
