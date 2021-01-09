import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import Users from '../../modules/users/schemas/Users';

describe('Create Users', () => {
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

  it('Should create a User', async () => {
    const response = await request(app).post('/users').send({
      username: 'mateusmoreirav',
      password: '12345678',
      mobileToken: '55555555555',
    });
    expect(response.status).toBe(201);
  });
  it('Should create a User without a mobileToken', async () => {
    const response = await request(app).post('/users').send({
      username: 'mateusmoreirav',
      password: '12345678',
    });
    expect(response.status).toBe(201);
  });
  it('Should not create a user that already exists by Username', async () => {
    await request(app).post('/users').send({
      username: 'mateusmoreirav',
      password: '12345678',
    });

    const response = await request(app).post('/users').send({
      username: 'mateusmoreirav',
      password: '12345678',
    });
    expect(response.status).toBe(409);
  });
  it('Should not create a user when is not given a username', async () => {
    const response = await request(app).post('/users').send({
      password: '12345678',
    });
    expect(response.status).toBe(422);
  });

  it('Should not create a user when is not given a password', async () => {
    const response = await request(app).post('/users').send({
      username: 'mateusmoreirav',
    });
    expect(response.status).toBe(422);
  });
});
