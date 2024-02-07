import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    telegramId: number;
    name: string;
    surname: string;
    registeredAt: Date;
    role: string;
    work_score: number
}

const UserSchema = new mongoose.Schema<IUser>({
    telegramId: {type: Number, unique: true, required: true},
    name: {type: String, required: true},
    surname: {type: String},
    registeredAt: {type: Date},
    role: {type: String, required: true, default: "User"},
    work_score: {type: Number, required: true, default: 0}
});

export const User = mongoose.model<IUser>("User", UserSchema);