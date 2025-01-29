import mongoose from 'mongoose';

const MetadataSchema = new mongoose.Schema({  // ✅ Use `new mongoose.Schema()`
    title: {
        type: String,
        required: true  // ✅ Ensure important fields are required
    },
    description: {
        type: String,
        required: true
    },
    keywords: {
        type: String
    },
    author: {
        type: String
    }
}, { timestamps: true });  // ✅ Adds `createdAt` & `updatedAt` timestamps automatically

const MetadataModel = mongoose.model('Metadata', MetadataSchema);

export default MetadataModel;
