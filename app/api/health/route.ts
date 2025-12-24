import { NextResponse } from 'next/server';
import dbConnect from "../../../lib/dbConnect";

export async function GET() {
    try {
        // Test database connection
        await dbConnect();

        return NextResponse.json({
            status: 'success',
            message: 'Database connected successfully',
            mongodb_url_exists: !!process.env.MONGODB_URL,
            jwt_secret_exists: !!process.env.JWT_SECRET,
            node_env: process.env.NODE_ENV
        }, { status: 200 });
    } catch (error: any) {
        console.error('Database connection test error:', {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code
        });

        return NextResponse.json({
            status: 'error',
            message: error.message,
            mongodb_url_exists: !!process.env.MONGODB_URL,
            jwt_secret_exists: !!process.env.JWT_SECRET
        }, { status: 500 });
    }
}
