import { NextResponse } from 'next/server';
import dbConnect from "../../../../lib/dbConnect";
import Article from "../../../../models/Article";
import News from "../../../../models/News";
import Testimonial from "../../../../models/Testimonial";

// Force dynamic to ensure data is fresh
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();

        // Run counting queries in parallel for maximum speed
        const [articlesCount, newsCount, testimonialsCount] = await Promise.all([
            Article.countDocuments({}),
            News.countDocuments({}),
            Testimonial.countDocuments({})
        ]);

        return NextResponse.json({
            articles: articlesCount,
            news: newsCount,
            testimonials: testimonialsCount
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard stats' },
            { status: 500 }
        );
    }
}
