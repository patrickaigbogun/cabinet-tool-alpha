'use server';

import { LoginFormData, RegisterFormData } from "@/app/types/objects";
import { registerUser } from "../auth/utils/register";
import { loginUser } from "../auth/utils/login";


export async function handleRegister(formData: FormData) {
	const userFormData: RegisterFormData = {
		username: formData.get('username')?.toString() || '',
		email: formData.get('email')?.toString() || '',
		password: formData.get('password')?.toString() || '',
	};

	await registerUser(userFormData)
}



export async function handleLogin(formData: FormData) {
	const userFormData: LoginFormData = {
		email: formData.get('email')?.toString() || '',
		password: formData.get('password')?.toString() || '',
	};

	await loginUser(userFormData)
}