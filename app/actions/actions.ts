'use server';

import sql from "../utils/db_conn";


export async function create(formData: FormData) {

	// Create the comments table if it does not exist
	await sql("CREATE TABLE IF NOT EXISTS comments (comment TEXT)");
	const comment = formData.get("comment");
	// Insert the comment from the form into the Postgres (powered by Neon)
	await sql("INSERT INTO comments (comment) VALUES ($1)", [comment]);
}