import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { StatusUser } from './entities/status-user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, StatusUser])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {
  constructor(private readonly userService: UserService) {}
}
