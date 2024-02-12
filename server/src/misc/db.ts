import mongoose from "mongoose";

type IDatabase = {
    init(): Promise<void>
}

export default class Database implements IDatabase{
    private readonly mongoURI: string | undefined;

    constructor(mongoURI: string | undefined) {

        this.mongoURI = mongoURI;
    }

    async init(): Promise<void> {
        if (this.mongoURI != undefined) {
            await mongoose.connect(this.mongoURI)
                .then(() => console.log('Database connected'))
                .catch(e => console.log(e));
        }

        mongoose.connection.on('error', e => console.log(e));
    }
}