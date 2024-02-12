import mongoose from "mongoose";
import {IUser} from "./user.model";

export type IDefect = {
    roomNumber: number;
    description: string;
    status: boolean;
    reportedBy: IUser;
    createdAt: Date;
    closedAt?: Date;
    imageUrl: string;
} & mongoose.Document

const DefectSchema = new mongoose.Schema<IDefect>({
    roomNumber: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    closedAt: { type: Date },
    imageUrl: { type: String }
})

export const Defect = mongoose.model<IDefect>('Defect', DefectSchema);

