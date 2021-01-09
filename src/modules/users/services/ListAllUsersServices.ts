import Users from '../schemas/Users';

interface IUserInterface {
  id: string;
  username: string;
  mobileToken?: string;
}

class ListAllUsersService {
  public async execute(): Promise<IUserInterface[]> {
    const users = await Users.find();

    return users.map((user: IUserInterface) => ({
      id: user.id,
      username: user.username,
      mobileToken: user.mobileToken,
    }));
  }
}

export default ListAllUsersService;
