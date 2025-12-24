import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
    try {
        await dbConnect();
        const articles = await Article.find({}).sort({ createdAt: -1 });
        return NextResponse.json(articles);
    } catch (error: any) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
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

        const imageFile = formData.get('mainImage') as File | null;
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

        const articleData = {
            title,
            subtitle,
            date,
            sections,
            status,
            mainImage
        };

        await dbConnect();
        const article = await Article.create(articleData);
        return NextResponse.json(article, { status: 201 });
    } catch (error: any) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
