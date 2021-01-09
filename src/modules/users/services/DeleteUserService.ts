import AppError from '../../../shared/errors/AppError';
import Users from '../schemas/Users';

interface IRequestDTO {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const userFinded = await Users.findById(id);

    if (!userFinded) throw new AppError('This user does not exists!', 404);

    const user = await Users.deleteOne({ _id: id });

    if (user.deletedCount !== 1) throw new AppError('User not deleted!', 400);
  }
}

export default DeleteUserService;
