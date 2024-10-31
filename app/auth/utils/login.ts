'use server';

import { LoginFormData } from "@/app/types/objects";
import sql from "@/app/utils/db_conn";
import bcrypt from "bcrypt";
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

export async function loginUser(userFormData: LoginFormData) {
    console.log('Logging you in:', userFormData);

    try {
        if (!userFormData.email || !userFormData.password) {
            return { 
                success: false, 
                error: 'All fields are required' 
            };
        }

        // Retrieve user record from the database
        const userRecord = await sql`
            SELECT user_id, email, password 
            FROM users 
            WHERE email = ${userFormData.email}
            LIMIT 1
        `;

        // Check if user exists
        if (userRecord.length === 0) {
            return { 
                success: false, 
                error: 'Invalid email or password' 
            };
        }

        const user = userRecord[0];
        const storedHashedPassword = user.password;

        // Compare provided password with stored hashed password
        const isPasswordMatch = await bcrypt.compare(userFormData.password, storedHashedPassword);

        if (!isPasswordMatch) {
            return { 
                success: false, 
                error: 'Invalid email or password' 
            };
        }

        // Generate JWT token
        const token = sign(
            { 
                userId: user.user_id, 
                email: user.email 
            }, 
            JWT_SECRET, 
            { expiresIn: '14d' }
        );

        // Set token in HTTP-only cookie

        const cookieStore = await cookies()
        cookieStore.set('auth_token', token, {
            name: 'sessioncookie',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 14 * 24 * 60 * 60, // 14 days in seconds
            path: '/'
        });

        return { 
            success: true,
            user: {
                user_id: user.user_id,
                email: user.email
            }
        };

    } catch (error: any) {
        console.error('Login failed:', error.message);
        return { 
            success: false, 
            error: 'Failed to log in: ' + error.message 
        };
    }
}