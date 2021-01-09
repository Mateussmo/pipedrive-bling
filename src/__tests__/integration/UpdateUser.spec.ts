import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import Users from '../../modules/users/schemas/Users';
import CreateUserService from '../../modules/users/services/CreateUserService';
import GenerateTokenService from '../../modules/users/services/GenerateTokenService';

describe('Update Users', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_DATABASE) {
      throw new Error('Mongo DB server not intiliazed');
    }

    await mongoose.connect(process.env.MONGO_DATABASE, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Users.deleteMany({});
  });

  it('Should Update a User', async () => {
    const createUser = new CreateUserService();
    const generateToken = new GenerateTokenService();

    const user = await createUser.execute({
      username: 'mateusmoreirav',
      password: '12345678',
    });

    const userToken = await generateToken.execute({ id: user._id });

    const response = await request(app)
      .patch('/users')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        password: '12345678',
        mobileToken: '55555555555',
      });
    expect(response.status).toBe(201);
  });
  it('Should update a User without a mobileToken', async () => {
    const createUser = new CreateUserService();
    const generateToken = new GenerateTokenService();

    const user = await createUser.execute({
      username: 'mateusmoreirav',
      password: '12345678',
    });

    const userToken = await generateToken.execute({ id: user._id });

    const response = await request(app)
      .patch('/users')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        password: '12345678',
      });
    expect(response.status).toBe(201);
  });
  it('Should not update a User without a password', async () => {
    const createUser = new CreateUserService();
    const generateToken = new GenerateTokenService();

    const user = await createUser.execute({
      username: 'mateusmoreirav',
      password: '12345678',
    });

    const userToken = await generateToken.execute({ id: user._id });

    const response = await request(app)
      .patch('/users')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        mobileToken: '55555555555',
      });
    expect(response.status).toBe(422);
  });
});
