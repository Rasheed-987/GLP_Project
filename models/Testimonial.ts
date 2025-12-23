import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema({
    value: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    },
    label: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    }
}, { _id: false });

const TestimonialSchema = new mongoose.Schema({
    name: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    },
    profession: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    },
    description: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    },
    graduateDate: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
    },
    companyLogo: { type: String }, // Assuming URL or base64 string
    achievements: {
        type: [AchievementSchema],
        validate: [arrayLimit, '{PATH} must have exactly 3 achievements']
    },
    status: {
        en: { type: String, enum: ['active', 'inactive'], default: 'active' },
        ar: { type: String, enum: ['active', 'inactive'], default: 'active' }
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

function arrayLimit(val: any[]) {
    return val.length === 3;
}

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
