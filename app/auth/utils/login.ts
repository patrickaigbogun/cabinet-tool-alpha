

import { LoginFormData } from "@/app/types/objects";
import sql from "@/app/utils/db_conn";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function loginUser(userFormData: LoginFormData) {
    console.log('Logging you in:', userFormData);

    try {
        if (!userFormData.email || !userFormData.password) {
            throw new Error('All fields are required');
        }

        // Retrieve user record from the database
        const userRecord = await sql`
            SELECT email, password 
            FROM users 
            WHERE email = ${userFormData.email}
            LIMIT 1
        `;

        // Check if user exists
        if (userRecord.length === 0) {
            throw new Error('Invalid email or password');
        }

        const storedHashedPassword = userRecord[0].password;

        // Compare provided password with stored hashed password
        const isPasswordMatch = await bcrypt.compare(userFormData.password, storedHashedPassword);

        if (isPasswordMatch) {
            // Redirect to the profile page on successful login
            redirect('/profile');
        } else {
            throw new Error('Invalid email or password');
        }

    } catch (error:any) {
        console.error('Login failed:', error.message);
        throw new Error('Failed to log in: ' + error.message);
    }
}
