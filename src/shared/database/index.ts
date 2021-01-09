import mongoose from 'mongoose';

class Database {
  public mongoConnection: Promise<mongoose.Mongoose>;

  constructor() {
    this.init();
  }

  private init(): void {
    this.mongoConnection = mongoose.connect(process.env.MONGO_DATABASE || '', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
}

export default new Database();
