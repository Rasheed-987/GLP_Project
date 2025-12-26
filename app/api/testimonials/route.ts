import { NextResponse } from 'next/server';
import dbConnect from "../../../lib/dbConnect";
import Testimonial from "../../../models/Testimonial";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const lang = searchParams.get('lang') as 'en' | 'ar' | null;

        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 0;

        await dbConnect();

        let query = Testimonial.find({}).sort({ createdAt: -1 });

        if (limit > 0) {
            query = query.limit(limit);
        }

        const testimonials = await query;

        if (lang && (lang === 'en' || lang === 'ar')) {
            const localizedTestimonials = testimonials.map((t: any) => ({
                id: t._id,
                name: t.name[lang],
                profession: t.profession[lang],
                description: t.description[lang],
                graduateDate: t.graduateDate[lang],
                companyLogo: t.companyLogo,
                image: t.image,
                achievements: t.achievements.map((ach: any) => ({
                    value: ach.value[lang],
                    label: ach.label[lang]
                })),
                status: t.status[lang],
                createdAt: t.createdAt,
                updatedAt: t.updatedAt
            }));
            return NextResponse.json(localizedTestimonials);
        }

        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();
        const testimonial = await Testimonial.create(body);
        return NextResponse.json(testimonial, { status: 201 });
    } catch (error) {
        console.error("Testimonial creation error:", error);
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}
