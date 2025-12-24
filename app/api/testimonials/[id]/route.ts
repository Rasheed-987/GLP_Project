import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Testimonial from '@/models/Testimonial';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(req.url);
        const lang = searchParams.get('lang') as 'en' | 'ar' | null;

        await dbConnect();
        const t = await Testimonial.findById(id);

        if (!t) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        if (lang && (lang === 'en' || lang === 'ar')) {
            const localizedTestimonial = {
                id: t._id,
                name: t.name[lang],
                profession: t.profession[lang],
                description: t.description[lang],
                graduateDate: t.graduateDate[lang],
                companyLogo: t.companyLogo,
                achievements: t.achievements.map((ach: any) => ({
                    value: ach.value[lang],
                    label: ach.label[lang]
                })),
                status: t.status[lang],
                createdAt: t.createdAt,
                updatedAt: t.updatedAt
            };
            return NextResponse.json(localizedTestimonial);
        }

        return NextResponse.json(t);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        await dbConnect();
        const testimonial = await Testimonial.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }
        return NextResponse.json(testimonial);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
        if (!deletedTestimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
