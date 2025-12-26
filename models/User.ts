import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide a full name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false,
    },
    resetPasswordOTP: String,
    resetPasswordOTPExpires: Date,
}, {
    timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
