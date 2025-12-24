import { NextResponse } from 'next/server';
import dbConnect from "../../../../lib/dbConnect";
import News from "../../../../models/News";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const lang = searchParams.get('lang') === 'ar' ? 'ar' : 'en';

        await dbConnect();

        // Find latest active news
        const latestNews = await News.findOne({
            [`status.${lang}`]: 'active'
        }).sort({ createdAt: -1 });

        if (!latestNews) {
            return NextResponse.json({ message: 'No active news found' }, { status: 404 });
        }

        // Transform data based on language
        const responseData = {
            id: latestNews._id,
            topic: latestNews.topic[lang],
            content: latestNews.content[lang],
            expiryDate: latestNews.expiryDate[lang],
            applyNowUrl: latestNews.applyNowUrl?.[lang] || '',
            createdAt: latestNews.createdAt
        };

        return NextResponse.json(responseData);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch latest news' }, { status: 500 });
    }
}
