'use server';

import { RegisterFormData } from "@/app/types/objects";
import sql from "../../utils/db_conn";
import bcrypt from "bcrypt";



export async function registerUser(userFormData: RegisterFormData) {
	console.log('Registering user:', userFormData);


	try {
		if (!userFormData.username || !userFormData.email || !userFormData.password) {
			throw new Error('All fields are required')
		}

		console.log('Registering user:', userFormData);

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(userFormData.password, salt);

		await sql`
			CREATE TABLE IF NOT EXISTS users (
				user_id SERIAL PRIMARY KEY,
				username VARCHAR(50) UNIQUE NOT NULL,
				email VARCHAR(100) UNIQUE NOT NULL,
				password VARCHAR(255) NOT NULL,
				created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP

        	)
		`;

		await sql`
		INSERT INTO users (username, email, password)
		VALUES (${userFormData.username}, ${userFormData.email}, ${hashedPassword})
	`;
		// Get the new user data (excluding password)
		const newUser = await sql`
            SELECT user_id, username, email, created_at 
            FROM users 
            WHERE username = ${userFormData.username}
            LIMIT 1
        `;

		

		


	} catch (error: any) {
		if (error.code === '23505') {
			if (error.constraint.includes('username')) {
				throw new Error('username has been registered');
			}
			if (error.constraint.includes('email')) {
				throw new Error('email has been registered, maybe you meant to login?');
			}
		}

		// Log the full error object for debugging
		console.error('Full error object:', {
			code: error.code,
			constraint: error.constraint,
			detail: error.detail,
			message: error.message
		});

	}



}

