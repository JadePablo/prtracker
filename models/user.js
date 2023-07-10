import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'email is taken'],
        required: [true, 'email is required'],
    },
    image: {
        type: String
    },
    prs: {
        type: [String] // Specify that `prs` is an array of strings
    }
});

const User = models.User || model('User', UserSchema);

export default User;
