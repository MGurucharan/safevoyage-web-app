import mongoose from 'mongoose';

const digitalIDSchema = new mongoose.Schema({
    userDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },
    userHash: { type: String, required: true }, // The hash that was stored on blockchain
    blockchainData: {
        transactionHash: { type: String, required: true },
        contractAddress: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    },
    qrCode: { type: String, required: true }, // Base64 encoded QR code
    isValid: { type: Boolean, default: true }
}, {
    timestamps: true // This automatically adds createdAt and updatedAt fields
});

const DigitalID = mongoose.model('DigitalID', digitalIDSchema);

export default DigitalID;
