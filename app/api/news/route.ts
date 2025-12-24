import { NextResponse } from 'next/server';
import dbConnect from "../../../lib/dbConnect";
import News from "../../../models/News";

export async function GET() {
    try {
        await dbConnect();
        const news = await News.find({}).sort({ createdAt: -1 });
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
