import bcrypt from 'bcrypt';
import AppError from '../../../shared/errors/AppError';
import Users, { IUsersInterface } from '../schemas/Users';

interface IRequestDTO {
  id: string;
  password: string;
  mobileToken?: string;
}

class UpdateUserService {
  public async execute({
    id,
    password,
    mobileToken,
  }: IRequestDTO): Promise<IUsersInterface> {
    const user = await Users.findByIdAndUpdate(
      { _id: id },
      { password: await bcrypt.hash(password, 10), mobileToken },
      { new: true },
    );

    if (!user) {
      throw new AppError('This user does not exists!', 404);
    }

    return user;
  }
}

export default UpdateUserService;
