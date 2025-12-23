import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
    topic: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    },
    content: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    },
    status: {
        en: { type: String, enum: ['active', 'inactive'], default: 'active' },
        ar: { type: String, enum: ['active', 'inactive'], default: 'active' }
    },
    expiryDate: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    },
    applyNowUrl: {
        en: { type: String },
        ar: { type: String }
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            (ret as any).id = ret._id;
            delete (ret as any)._id;
            delete (ret as any).__v;
            return ret;
        }
    }
});

export default mongoose.models.News || mongoose.model('News', NewsSchema);
