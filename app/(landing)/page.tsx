import { SignIn } from "@phosphor-icons/react/dist/ssr";
import { create } from "../actions/actions";

export default function Page() {

	return (
		<form
			action={create}
			className="bg-white h-screen w-screen flex flex-col items-center justify-center"
		>
			<div className="flex flex-col">
				<input
					type="text"
					name="comment"
					placeholder="Write a comment"
					className="rounded px-4 py-2 border outline-none focus:border-black"
				/>
				<button
					type="submit"
					className="max-w-max px-3 py-1 mt-5 rounded bg-black text-white"
				>
					<span>Login </span><SignIn size={32} />
				</button>
			</div>
		</form>
	);
}