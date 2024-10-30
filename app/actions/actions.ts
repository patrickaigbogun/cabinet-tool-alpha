'use server';

import { UserFormData } from "@/app/types/objects";
import { registerUser } from "../auth/utils/register";


export async function handleSubmit(formData:FormData) {
    const userFormData: UserFormData = {
        username: formData.get('username')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        password: formData.get('password')?.toString() || '',
      };

    await registerUser(userFormData)
}