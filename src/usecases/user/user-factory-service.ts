import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dto/user/CreateUserDto';
import { User } from 'src/infra/entities/user.entity';

@Injectable()
export class UserFactoryService {
  createUser(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.email = createUserDto.email;
  }
}
