import { handleRegister } from "@/app/actions/server/actions";



export default function RegisterPage() {



return(
    <form action={handleRegister} className="flex flex-col space-y-10" >
        <input name="username"  type="text"  placeholder="sexybatman" required/>
        <input name="email" type="email" placeholder="sexybatman@gotham.com" required/>
        <input name="password" type="password" placeholder="sexybasty123##" required />
        <button className="bg-gray-300" >
            <span>
            Register
            </span>
        </button>
    </form>
)

}