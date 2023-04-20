import { UserRepository } from 'src/domain/interface/UserRepository';
import { ILogger } from 'src/domain/logger/Logger.interface';
import { UserM } from 'src/domain/model/UserM';
import { BcryptService } from '../../infra/services/bcrypt/bcrypt.service';

export class UserUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async getById(id: number): Promise<UserM> {
    const result = await this.userRepository.getById(id);
    this.logger.log('getUserById execute', 'got user as per requested id');
    return result;
  }

  async getAll(): Promise<UserM[]> {
    return await this.userRepository.getAll();
  }

  async getByEmail(email: string): Promise<UserM> {
    const result = await this.userRepository.getByEmail(email);
    this.logger.log('getUserById execute', 'got user as per requested email');
    return result;
  }

  async register(user: UserM): Promise<UserM> {
    const the_user = new UserM();
    the_user.name = user.name;
    the_user.email = user.email;
    the_user.password = await this.bcryptService.hash(user.password);
    const result = await this.userRepository.create(the_user);
    this.logger.log('addUserUseCases execute', 'New User have been inserted');
    return result;
  }
}
