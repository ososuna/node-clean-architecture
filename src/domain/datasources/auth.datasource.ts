import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { User } from '../entities/user.entity';

/**
* Abstract business rules to implement.
* No matter which data source we are using:
* MongoDb, PostgreSQL, Oracle.
* Each data source must has a login and register method
*/
export interface AuthDataSource {
  // abstract login(loginUserDto: LoginUserDto): Promise<User>
  register(registerUserDto: RegisterUserDto): Promise<User>
}