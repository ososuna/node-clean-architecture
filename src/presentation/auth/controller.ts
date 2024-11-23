import { Request, Response } from 'express';
import { AuthRepository, CustomError, RegisterUserDto } from '../../domain';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';

export class AuthController {

  // dependency injection 💉
  constructor(
    private readonly authRepository: AuthRepository
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error); // winston logger
    return res.status(500).json({ error: 'internal server error' });
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }
    this.authRepository.register(registerUserDto!)
      .then(async (user) => {
        res.json({
          user,
          token: await JwtAdapter.generateToken({ id: user.id })
        })
      })
      .catch(error => this.handleError(error, res));
  }

  loginUser = (req: Request, res: Response) => {
    res.json('loginUser controller');
  }

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then(users => {
        res.json({
          users,
          user: req.body.user
        })
      })
      .catch(() => res.status(500).json({error: 'internal server error'}));
  }

}