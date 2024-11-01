'use server';

import { LoginFormData, RegisterFormData } from "@/app/types/objects";
import { registerUser } from "@/app/auth/utils/register";
import { verify } from 'jsonwebtoken';
import { cookies } from "next/headers";
// import { loginUser } from "../auth/utils/login";


export async function handleRegister(formData: FormData) {
	const userFormData: RegisterFormData = {
		username: formData.get('username')?.toString() || '',
		email: formData.get('email')?.toString() || '',
		password: formData.get('password')?.toString() || '',
	};

	await registerUser(userFormData)
}


export async function getUserIdFromCookie() {
  
	const cookieStore = cookies();
	const sessionCookie = (await cookieStore).get('sessioncookie');
	
	if (!sessionCookie) {
	  throw new Error('No session cookie found');
	}
  
	const decoded = verify(sessionCookie.value, 'vws7XKWHH4Dx11IfmDh836vl2cXop6ISfvilSv9q4DGF8ayYK+aLMT6eD5rkyFfrfo0OtAHjTXh2TYnCLsc9JA' );
	return (decoded as { userId: number }).userId;
  }
