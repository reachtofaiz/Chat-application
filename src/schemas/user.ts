import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;