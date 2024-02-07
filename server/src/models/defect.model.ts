import mongoose from "mongoose";
import {IUser} from "./user.model";

export interface IDefect extends mongoose.Document {
    title: string;
    description: string;
    status: boolean;
    reportedBy: IUser;
    createdAt: Date;
    closedAt?: Date;
    imageUrl: String;
}

const DefectSchema = new mongoose.Schema<IDefect>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    closedAt: { type: Date },
    imageUrl: { type: String }
})

export const Defect = mongoose.model<IDefect>('Defect', DefectSchema);

