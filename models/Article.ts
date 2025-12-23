import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
    title: {
        en: string;
        ar: string;
    };
    subtitle: {
        en: string;
        ar: string;
    };
    date: {
        en: string;
        ar: string;
    };
    mainImage: string;
    sections: {
        id: string;
        heading: {
            en: string;
            ar: string;
        };
        content: {
            en: string;
            ar: string;
        };
    }[];
    status: {
        en: 'active' | 'inactive';
        ar: 'active' | 'inactive';
    };
    createdAt: Date;
    updatedAt: Date;
}

const ArticleSchema: Schema = new Schema(
    {
        title: {
            en: { type: String, required: true },
            ar: { type: String, required: true },
        },
        subtitle: {
            en: { type: String, required: true },
            ar: { type: String, required: true },
        },
        date: {
            en: { type: String, required: true },
            ar: { type: String, required: true },
        },
        mainImage: { type: String, required: true },
        sections: [
            {
                id: { type: String, required: true },
                heading: {
                    en: { type: String },
                    ar: { type: String },
                },
                content: {
                    en: { type: String },
                    ar: { type: String },
                },
            },
        ],
        status: {
            en: { type: String, enum: ['active', 'inactive'], default: 'active' },
            ar: { type: String, enum: ['active', 'inactive'], default: 'active' },
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret: any) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);
