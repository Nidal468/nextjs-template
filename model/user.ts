import { model, models, Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  provider: string;
  password: string;
  novels: { id: string }[];
  history: { id: string }[];
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, trim: true },
    email: { type: String, unique: true, trim: true },
    image: { type: String },
    provider: { type: String },
    password: { type: String },

    // ✅ Proper array of objects with `_id: false`
    novels: [
      {
        id: { type: String, required: true },
        _id: false,
      },
    ],

    history: [
      {
        id: { type: String, required: true },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);

export { User };
