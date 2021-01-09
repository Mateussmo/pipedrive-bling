import { model, Document, Schema } from 'mongoose';

export interface IDealsInterface extends Document {
  clientName: string;
  date: string;
  itens: any;
}

const DealsSchema = new Schema(
  {
    clientName: {
      type: String,
    },
    date: {
      type: String,
    },
    total: {
      type: String,
    },
    itens: {
      type: Array,
    },
  },
  {
    timestamps: true,
    collection: 'Deals',
    versionKey: false,
  },
);

export default model<IDealsInterface>('Deals', DealsSchema);
