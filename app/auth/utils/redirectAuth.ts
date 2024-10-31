import { redirect } from "next/navigation";


export function redirectAuth() {
    return redirect('../login/')

}