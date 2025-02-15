import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
    message: string
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
})

const ContentMessage = (mongoose.models.Message as mongoose.Model<Message>) || mongoose.model<Message>("Message", MessageSchema)

export default ContentMessage;