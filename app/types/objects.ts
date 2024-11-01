

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
	userId: number;
	originalName: string;
	fileUrl: string |void ;
	fileSize: number;
	mimeType: string;
	uploadedAt: Date;
}