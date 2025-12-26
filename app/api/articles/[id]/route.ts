import { NextResponse } from 'next/server';
import dbConnect from "../../../../lib/dbConnect";
import Article from "../../../../models/Article";
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(req.url);
        const lang = searchParams.get('lang') as 'en' | 'ar' | null;

        await dbConnect();
        const article = await Article.findById(id);

        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        if (lang && (lang === 'en' || lang === 'ar')) {
            const localizedArticle = {
                id: article._id,
                title: article.title[lang],
                subtitle: article.subtitle[lang],
                date: article.date[lang],
                mainImage: article.mainImage,
                sections: article.sections.map((section: any) => ({
                    id: section.id,
                    heading: section.heading[lang],
                    content: section.content[lang]
                })),
                status: article.status[lang],
                createdAt: article.createdAt,
                updatedAt: article.updatedAt
            };
            return NextResponse.json(localizedArticle);
        }

        return NextResponse.json(article);
    } catch (error: any) {
        console.error('Error fetching article:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const formData = await req.formData();

        const title = {
            en: formData.get('titleEn') as string,
            ar: formData.get('titleAr') as string
        };
        const subtitle = {
            en: formData.get('subtitleEn') as string,
            ar: formData.get('subtitleAr') as string
        };
        const date = {
            en: formData.get('dateEn') as string,
            ar: formData.get('dateAr') as string
        };
        const sections = JSON.parse(formData.get('sections') as string);
        const status = {
            en: formData.get('statusEn') as string,
            ar: formData.get('statusAr') as string
        };

        const imageFile = formData.get('mainImage') as File | string | null;
        let mainImage = "";

        if (imageFile && typeof imageFile !== 'string') {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadDir = join(process.cwd(), 'public', 'uploads', 'articles');
            await mkdir(uploadDir, { recursive: true });

            const fileName = `${Date.now()}-${imageFile.name}`;
            const path = join(uploadDir, fileName);
            await writeFile(path, buffer);
            mainImage = `/uploads/articles/${fileName}`;
        } else if (typeof imageFile === 'string') {
            mainImage = imageFile;
        }

        const updateData: any = {
            title,
            subtitle,
            date,
            sections,
            status,
        };

        if (mainImage) {
            updateData.mainImage = mainImage;
        }

        await dbConnect();
        const article = await Article.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }
        return NextResponse.json(article);
    } catch (error: any) {
        console.error('Error updating article:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();

        // First, get the article to find the image path
        const article = await Article.findById(id);
        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        // Delete associated image file from filesystem
        if (article.mainImage && article.mainImage.startsWith('/uploads/articles/')) {
            const imagePath = join(process.cwd(), 'public', article.mainImage);
            try {
                await unlink(imagePath);
            } catch (err) {
                // File might not exist, continue
                console.log(`Could not delete file: ${imagePath}`);
            }
        }

        // Delete the article from database
        await Article.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Article deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting article:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
