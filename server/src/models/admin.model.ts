import mongoose from "mongoose";

export interface IAdmin extends mongoose.Document {
    login: string;
    password: string;
    name: string;
    surname: string
}

const AdminSchema = new mongoose.Schema<IAdmin>({
    login: {type: String, unique: true},
    password: {type: String},
    name: {type: String},
    surname: {type: String}
});

export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);