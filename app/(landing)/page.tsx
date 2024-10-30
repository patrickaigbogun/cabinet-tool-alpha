'use client';

import { SignIn } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()

	return (
		<section
			className="bg-white h-screen w-screen flex flex-col items-center justify-center"
		>
			<div className="flex flex-col">
				<button
					type="button"
					className="max-w-max px-3 py-1 mt-5 rounded bg-black text-white"
					onClick={()=>router.push('/auth/register')}
				>
					<span>Login </span><SignIn size={32} />
				</button>
			</div>
		</section>
	);
}