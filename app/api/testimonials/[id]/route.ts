import { NextResponse } from 'next/server';
import dbConnect from "../../../../lib/dbConnect";
import Testimonial from "../../../../models/Testimonial";
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';

// Helper function to delete a file safely
async function deleteFile(filePath: string) {
    if (!filePath) return;
    try {
        // Remove leading slash if it exists, but join handles it mostly
        // However, join(process.cwd(), 'public', '/uploads/...') can be tricky on some systems
        const absolutePath = join(process.cwd(), 'public', filePath.startsWith('/') ? filePath.slice(1) : filePath);
        await unlink(absolutePath);
    } catch (err) {
        // File might not exist or other issue, just log it
        console.log(`Could not delete file: ${filePath}`);
    }
}

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
        await dbConnect();

        // Find existing testimonial to handle file cleanup and partial updates
        const existingTestimonial = await Testimonial.findById(id);
        if (!existingTestimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        const contentType = req.headers.get('content-type') || '';
        let updateData: any = {};

        if (contentType.includes('application/json')) {
            const body = await req.json();
            // Deep merge or specific field update for JSON (usually status toggle)
            updateData = { ...existingTestimonial.toObject(), ...body };
        } else if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();

            // Extract bilingual fields
            const name = {
                en: formData.get('nameEn') as string || existingTestimonial.name.en,
                ar: formData.get('nameAr') as string || existingTestimonial.name.ar
            };
            const profession = {
                en: formData.get('professionEn') as string || existingTestimonial.profession.en,
                ar: formData.get('professionAr') as string || existingTestimonial.profession.ar
            };
            const description = {
                en: formData.get('descriptionEn') as string || existingTestimonial.description.en,
                ar: formData.get('descriptionAr') as string || existingTestimonial.description.ar
            };
            const graduateDate = {
                en: formData.get('graduateDateEn') as string || existingTestimonial.graduateDate.en,
                ar: formData.get('graduateDateAr') as string || existingTestimonial.graduateDate.ar
            };
            const status = {
                en: formData.get('statusEn') as string || existingTestimonial.status.en,
                ar: formData.get('statusAr') as string || existingTestimonial.status.ar
            };

            // Parse achievements from FormData
            const achievementsRaw = formData.get('achievements');
            const achievements = achievementsRaw ? JSON.parse(achievementsRaw as string) : existingTestimonial.achievements;

            // Handle image file upload
            const imageFile = formData.get('image') as File | string | null;
            let imagePath = existingTestimonial.image;

            if (imageFile && typeof imageFile !== 'string' && imageFile instanceof File) {
                // New file uploaded
                const bytes = await imageFile.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const uploadDir = join(process.cwd(), 'public', 'uploads', 'testimonials');
                await mkdir(uploadDir, { recursive: true });
                const fileName = `${Date.now()}-${imageFile.name}`;
                const path = join(uploadDir, fileName);
                await writeFile(path, buffer);

                // Delete old image if it exists
                if (existingTestimonial.image && existingTestimonial.image.startsWith('/uploads/testimonials/')) {
                    await deleteFile(existingTestimonial.image);
                }
                imagePath = `/uploads/testimonials/${fileName}`;
            }

            // Handle companyLogo file upload
            const logoFile = formData.get('companyLogo') as File | string | null;
            let logoPath = existingTestimonial.companyLogo;

            if (logoFile && typeof logoFile !== 'string' && logoFile instanceof File) {
                // New file uploaded
                const bytes = await logoFile.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const uploadDir = join(process.cwd(), 'public', 'uploads', 'testimonials');
                await mkdir(uploadDir, { recursive: true });
                const fileName = `${Date.now()}-${logoFile.name}`;
                const path = join(uploadDir, fileName);
                await writeFile(path, buffer);

                // Delete old logo if it exists
                if (existingTestimonial.companyLogo && existingTestimonial.companyLogo.startsWith('/uploads/testimonials/')) {
                    await deleteFile(existingTestimonial.companyLogo);
                }
                logoPath = `/uploads/testimonials/${fileName}`;
            }

            updateData = {
                name,
                profession,
                description,
                graduateDate,
                achievements,
                status,
                image: imagePath,
                companyLogo: logoPath
            };
        } else {
            return NextResponse.json({ error: 'Unsupported Content-Type' }, { status: 400 });
        }

        const testimonial = await Testimonial.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        return NextResponse.json(testimonial);
    } catch (error) {
        console.error('Error updating testimonial:', error);
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

        // Delete associated files from filesystem using the helper
        if (testimonial.image && testimonial.image.startsWith('/uploads/testimonials/')) {
            await deleteFile(testimonial.image);
        }

        if (testimonial.companyLogo && testimonial.companyLogo.startsWith('/uploads/testimonials/')) {
            await deleteFile(testimonial.companyLogo);
        }

        // Delete the testimonial from database
        await Testimonial.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}

