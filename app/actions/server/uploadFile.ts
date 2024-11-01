'use server'
import sql from '@/app/utils/db_conn';
import { uploadB2 } from '@/app/utils/storage';
import { UserFileDb, UserFileStore } from '@/app/types/objects';

export async function handleFileUpload(fileData: UserFileStore, userId: number) {
	try {
		// 1. Upload to Backblaze
		// const fileUrl = await uploadB2(fileData.file);
		const fileUrl = 'some url'
		// 2. Prepare database record
		const randFileID = crypto.randomUUID()
		const userFileDb: UserFileDb = {
			fileId: randFileID,
			userId,
			originalName: fileData.name,
			fileUrl,
			fileSize: fileData.size,
			mimeType: fileData.type,
			uploadedAt: new Date()
		};
		// 3. Store in database
		await sql`
			INSERT INTO files (
				file_id,
				user_id,
				original_name,
				file_url,
				file_size,
				mime_type,
				uploaded_at
			)VALUES (
				${userFileDb.fileId},
				${userFileDb.userId},
				${userFileDb.originalName},
				${userFileDb.fileUrl},
				${userFileDb.fileSize},
				${userFileDb.mimeType},
				${userFileDb.uploadedAt}
			)
    	`;
		return {
			success: true,
			fileId: userFileDb.fileId,
			fileUrl: userFileDb.fileUrl
		};

	} catch (error) {
		console.error('File upload failed:', error);
		return {
			success: false,
			error: 'Failed to upload file'
		};
	}
}