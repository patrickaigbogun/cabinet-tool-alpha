import sql from "../../utils/db_conn";


export async function register() {
    await sql("CREATE TABLE IF NOT EXISTS users (user TEXT)");


}

