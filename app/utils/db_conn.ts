import { neon } from "@neondatabase/serverless";


// Create an instance of Neon's TS/JS driver
const sql = neon(`${process.env.DATABASE_URL}`);

export default sql