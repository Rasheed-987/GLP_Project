import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";

export async function POST(req: Request) {
    console.log('=== Registration request received ===');
    try {
        const body = await req.json();
        console.log('Request body parsed:', { ...body, password: '[REDACTED]' });

        const { fullName, email, phone, password } = body;

        if (!fullName || !email || !phone || !password) {
            console.log('Missing fields:', { fullName: !!fullName, email: !!email, phone: !!phone, password: !!password });
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        console.log('Attempting database connection...');
        await dbConnect();
        console.log('Database connected successfully');

        console.log('Checking for existing user with email:', email);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }
        console.log('No existing user found, proceeding with registration');

        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log('Password hashed successfully');

        console.log('Creating user in database...');
        const user = await User.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
        });
        console.log('User created successfully with ID:', user._id);

        return NextResponse.json({ message: 'User registered successfully', userId: user._id }, { status: 201 });
    } catch (error: any) {
        console.error('=== Registration error details ===');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error stack:', error.stack);
        console.error('Full error object:', JSON.stringify(error, null, 2));

        return NextResponse.json({
            error: 'Internal Server Error',
            message: error.message,
            code: error.code
        }, { status: 500 });
    }
}
