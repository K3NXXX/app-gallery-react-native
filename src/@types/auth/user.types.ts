export interface IUser {
	user: {
		id: number
		name: string
		email: string
		password: string
		createdAt: string
		updatedAt: string
	}
}

export interface IEditData {
	name: string
	email: string
	password: string
	currentPassword: string
}
