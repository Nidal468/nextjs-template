import { model, models, Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    image: string;
    provider: string;
    points: number;
    password: string;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, trim: true },
        email: { type: String, unique: true, trim: true },
        image: { type: String },
        provider: { type: String },
        points: { type: Number, default: 0 },
        password: { type: String },
    },
    {
        timestamps: true,
    }
);

const User = models.User || model<IUser>('User', UserSchema);

export { User };
