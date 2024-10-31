'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginFormData } from "@/app/types/objects";
import { loginUser } from "../utils/login";

export default function LoginPage() {
   const [error, setError] = useState<string | null>(null);
   const router = useRouter();

   async function handleLogin(formData: FormData) {
       setError(null); // Reset any previous errors

       const userFormData: LoginFormData = {
           email: formData.get('email')?.toString() || '',
           password: formData.get('password')?.toString() || '',
       };

       try {
           const result = await loginUser(userFormData);
           
           if (result.success) {
               // Redirect to profile or dashboard
               router.push('/profile');
           } else {
               // Set error message from server
               setError(result.error || 'Login failed');
           }
       } catch (error: any) {
           // Handle any unexpected errors
           setError(error.message || 'An unexpected error occurred');
       }
   }

   return (
       <div className="max-w-md mx-auto mt-10">
           <form action={handleLogin} className="flex flex-col space-y-4">
               <input 
                   name="email" 
                   type="email" 
                   placeholder="email@example.com" 
                   required 
                   className="p-2 border rounded"
               />
               <input 
                   name="password" 
                   type="password" 
                   placeholder="Password" 
                   required 
                   className="p-2 border rounded"
               />
               {error && (
                   <div className="text-red-500 text-sm">
                       {error}
                   </div>
               )}
               <button 
                   type="submit" 
                   className="bg-gray-300 p-2 rounded hover:bg-gray-400 transition"
               >
                   Login
               </button>
           </form>
       </div>
   );
}