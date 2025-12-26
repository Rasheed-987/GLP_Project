import { NextResponse } from 'next/server';
import dbConnect from "../../../../lib/dbConnect";
import Testimonial from "../../../../models/Testimonial";
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';

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
                image: t.image,
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
            // New file uploaded
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadDir = join(process.cwd(), 'public', 'uploads', 'testimonials');
            await mkdir(uploadDir, { recursive: true });

            const fileName = `${Date.now()}-${imageFile.name}`;
            const path = join(uploadDir, fileName);
            await writeFile(path, buffer);
            imagePath = `/uploads/testimonials/${fileName}`;
        } else if (typeof imageFile === 'string') {
            // Keep existing path
            imagePath = imageFile;
        }

        // Handle companyLogo file upload
        const logoFile = formData.get('companyLogo') as File | string | null;
        let logoPath = "";

        if (logoFile && typeof logoFile !== 'string' && logoFile instanceof File) {
            // New file uploaded
            const bytes = await logoFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadDir = join(process.cwd(), 'public', 'uploads', 'testimonials');
            await mkdir(uploadDir, { recursive: true });

            const fileName = `${Date.now()}-${logoFile.name}`;
            const path = join(uploadDir, fileName);
            await writeFile(path, buffer);
            logoPath = `/uploads/testimonials/${fileName}`;
        } else if (typeof logoFile === 'string') {
            // Keep existing path
            logoPath = logoFile;
        }

        const updateData: any = {
            name,
            profession,
            description,
            graduateDate,
            achievements,
            status,
        };

        if (imagePath) {
            updateData.image = imagePath;
        }

        if (logoPath) {
            updateData.companyLogo = logoPath;
        }

        await dbConnect();
        const testimonial = await Testimonial.findByIdAndUpdate(id, updateData, {
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

        // First, get the testimonial to find the image paths
        const testimonial = await Testimonial.findById(id);
        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        // Delete associated files from filesystem
        const filesToDelete: string[] = [];

        if (testimonial.image && testimonial.image.startsWith('/uploads/testimonials/')) {
            const imagePath = join(process.cwd(), 'public', testimonial.image);
            filesToDelete.push(imagePath);
        }

        if (testimonial.companyLogo && testimonial.companyLogo.startsWith('/uploads/testimonials/')) {
            const logoPath = join(process.cwd(), 'public', testimonial.companyLogo);
            filesToDelete.push(logoPath);
        }

        // Delete files (ignore errors if files don't exist)
        for (const filePath of filesToDelete) {
            try {
                await unlink(filePath);
            } catch (err) {
                // File might not exist, continue
                console.log(`Could not delete file: ${filePath}`);
            }
        }

        // Delete the testimonial from database
        await Testimonial.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
