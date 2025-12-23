import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Article from '@/models/Article';

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
        const body = await req.json();
        await dbConnect();
        const article = await Article.create(body);
        return NextResponse.json(article, { status: 201 });
    } catch (error: any) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
