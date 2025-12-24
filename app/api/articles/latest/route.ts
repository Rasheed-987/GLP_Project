import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const lang = searchParams.get('lang') as 'en' | 'ar' | null;

        await dbConnect();
        // Fetch top 3 latest articles sorted by createdAt in descending order
        const articles = await Article.find({}).sort({ createdAt: -1 }).limit(3);

        if (lang && (lang === 'en' || lang === 'ar')) {
            const localizedArticles = articles.map((article: any) => ({
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
            }));
            return NextResponse.json(localizedArticles);
        }

        return NextResponse.json(articles);
    } catch (error: any) {
        console.error('Error fetching latest articles:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
