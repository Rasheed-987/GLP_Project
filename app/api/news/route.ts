import { NextResponse } from 'next/server';
import dbConnect from "../../../lib/dbConnect";
import News from "../../../models/News";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const lang = searchParams.get('lang') as 'en' | 'ar' | null;
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 0;

        await dbConnect();

        let query = News.find({}).sort({ createdAt: -1 });

        if (limit > 0) {
            query = query.limit(limit);
        }

        const news = await query;

        if (lang && (lang === 'en' || lang === 'ar')) {
            const localizedNews = news.map((item: any) => ({
                id: item._id,
                topic: item.topic[lang],
                content: item.content[lang],
                status: item.status[lang],
                expiryDate: item.expiryDate[lang],
                applyNowUrl: item.applyNowUrl?.[lang],
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }));
            return NextResponse.json(localizedNews);
        }

        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();
        const news = await News.create(body);
        return NextResponse.json(news, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
    }
}
