import mongoose from "mongoose";

export type IAdmin = {
    login: string;
    password: string;
    name: string;
    surname: string
} & mongoose.Document

const AdminSchema = new mongoose.Schema<IAdmin>({
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String}
});

export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);