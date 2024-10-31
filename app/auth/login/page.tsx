import { handleLogin } from "@/app/actions/actions";


export default function LoginPage() {

	return (
		<form action={handleLogin} className="flex flex-col space-y-10" >
        <input name="email" type="email" placeholder="sexybatman@gotham.com" required/>
        <input name="password" type="password" placeholder="sexybasty123##" required />
        <button className="bg-gray-300" >
            <span>
            Login
            </span>
        </button>
    </form>
	);
}