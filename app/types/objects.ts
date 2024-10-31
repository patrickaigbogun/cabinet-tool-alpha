

export type RegisterFormData = {
	username: string;
	email: string;
	password: string;
}

export type LoginFormData = {
	email: string;
	password: string;
}

export interface UserFileStore {
	file: File;
	name: string;
	size: number;
	type: string;
	lastModified: number;
}

export interface UserFileDb {
	fileId: string;
	userId: string;
	originalName: string;
	fileUrl: string;
	fileSize: number;
	mimeType: string;
	uploadedAt: Date;
}