import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import Users from '../../modules/users/schemas/Users';
import CreateUserService from '../../modules/users/services/CreateUserService';

describe('Should list All Users', () => {
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

  it('Should list all Users', async () => {
    const createUser = new CreateUserService();

    await createUser.execute({
      username: 'mateusmoreirav',
      password: '12345678',
    });

    const response = await request(app).get(`/users`);

    expect(response.status).toBe(200);
  });
});
