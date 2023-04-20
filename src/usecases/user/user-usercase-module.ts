import { Module } from '@nestjs/common';
import { UserUseCase } from './user-usecase';
import { UserFactoryService } from './user-factory-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infra/entities/user.entity';
import { TypeOrmConfigModule } from 'src/infra/config/typeorm/typeorm.module';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User])],
  providers: [UserUseCase, UserFactoryService],
  exports: [UserUseCase, UserFactoryService],
})
export class BookUseCasesModule {}
