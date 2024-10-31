'use server';

import { LoginFormData, RegisterFormData } from "@/app/types/objects";
import { registerUser } from "@/app/auth/utils/register";
// import { loginUser } from "../auth/utils/login";


export async function handleRegister(formData: FormData) {
	const userFormData: RegisterFormData = {
		username: formData.get('username')?.toString() || '',
		email: formData.get('email')?.toString() || '',
		password: formData.get('password')?.toString() || '',
	};

	await registerUser(userFormData)
}



