import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
        }

        await dbConnect();

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Remove password from response
        const userResponse = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
        };

        const response = NextResponse.json({
            message: 'Logged in successfully',
            user: userResponse,
            token,
        }, { status: 200 });

        // Optionally set cookie
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return response;
    } catch (error: any) {
        console.error('Login error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code
        });

        // Return more specific error for debugging (remove in production after fixing)
        return NextResponse.json({
            error: 'Internal Server Error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 });
    }
}
