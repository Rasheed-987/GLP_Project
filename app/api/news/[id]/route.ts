import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();
        const news = await News.findById(id);
        if (!news) {
            return NextResponse.json({ error: 'News not found' }, { status: 404 });
        }
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        await dbConnect();
        const news = await News.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!news) {
            return NextResponse.json({ error: 'News not found' }, { status: 404 });
        }
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();
        const deletedNews = await News.findByIdAndDelete(id);
        if (!deletedNews) {
            return NextResponse.json({ error: 'News not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'News deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
    }
}
