import { Module } from '@nestjs/common';
import { AuthUseCases } from './auth-usecase';

@Module({
  imports: [],
  providers: [AuthUseCases],
  exports: [AuthUseCases],
})
export class BookUseCasesModule {}
