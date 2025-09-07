import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    passportNumber: {
        type: String,
        required: true,
        unique: true
    },
    aadhaarNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    blockchainHash: {
        type: String,
        unique: true
    },
    transactionId: {
        type: String,
        unique: true
    },
    blockchainTimestamp: {
        type: Date
    }
});

export default mongoose.model('Tourist', itemSchema);
