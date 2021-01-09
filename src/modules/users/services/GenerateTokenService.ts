import jwt from 'jsonwebtoken';

interface IRequestDTO {
  id: string;
}

class GenerateTokenService {
  public async execute({ id }: IRequestDTO): Promise<string> {
    return jwt.sign({ id }, process.env.SECRET as string, {
      expiresIn: process.env.EXPIRESIN,
    });
  }
}

export default GenerateTokenService;
