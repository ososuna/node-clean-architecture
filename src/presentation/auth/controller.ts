import { Request, Response } from 'express';
import { AuthRepository, CustomError, RegisterUser, RegisterUserDto } from '../../domain';
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
    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then( data => res.json(data) )
      .catch( error => this.handleError(error, res) );
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