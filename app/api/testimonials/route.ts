import { NextResponse } from 'next/server';
import dbConnect from "../../../lib/dbConnect";
import Testimonial from "../../../models/Testimonial";
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

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
        const formData = await req.formData();

        // Extract bilingual fields
        const name = {
            en: formData.get('nameEn') as string,
            ar: formData.get('nameAr') as string
        };
        const profession = {
            en: formData.get('professionEn') as string,
            ar: formData.get('professionAr') as string
        };
        const description = {
            en: formData.get('descriptionEn') as string,
            ar: formData.get('descriptionAr') as string
        };
        const graduateDate = {
            en: formData.get('graduateDateEn') as string,
            ar: formData.get('graduateDateAr') as string
        };
        const status = {
            en: formData.get('statusEn') as string || 'active',
            ar: formData.get('statusAr') as string || 'active'
        };

        // Parse achievements from FormData
        const achievements = JSON.parse(formData.get('achievements') as string || '[]');

        // Handle image file upload
        const imageFile = formData.get('image') as File | string | null;
        let imagePath = "";

        if (imageFile && typeof imageFile !== 'string' && imageFile instanceof File) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadDir = join(process.cwd(), 'public', 'uploads', 'testimonials');
            await mkdir(uploadDir, { recursive: true });

            const fileName = `${Date.now()}-${imageFile.name}`;
            const path = join(uploadDir, fileName);
            await writeFile(path, buffer);
            imagePath = `/uploads/testimonials/${fileName}`;
        }

        // Handle companyLogo file upload
        const logoFile = formData.get('companyLogo') as File | string | null;
        let logoPath = "";

        if (logoFile && typeof logoFile !== 'string' && logoFile instanceof File) {
            const bytes = await logoFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadDir = join(process.cwd(), 'public', 'uploads', 'testimonials');
            await mkdir(uploadDir, { recursive: true });

            const fileName = `${Date.now()}-${logoFile.name}`;
            const path = join(uploadDir, fileName);
            await writeFile(path, buffer);
            logoPath = `/uploads/testimonials/${fileName}`;
        }

        const testimonialData: any = {
            name,
            profession,
            description,
            graduateDate,
            achievements,
            status,
        };

        if (imagePath) {
            testimonialData.image = imagePath;
        }

        if (logoPath) {
            testimonialData.companyLogo = logoPath;
        }

        await dbConnect();
        const testimonial = await Testimonial.create(testimonialData);
        return NextResponse.json(testimonial, { status: 201 });
    } catch (error) {
        console.error("Testimonial creation error:", error);
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}
