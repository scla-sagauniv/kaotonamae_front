export type SignInType = {
	email: string;
	password: string;
};

export type SignUpType = {
	email: string;
	password: string;
	confirmPassword: string;
};

export type OneTimePassType = {
	otp: string;
};

export type ProfileInfoType = {
	lastName: string;
	firstName: string;
	lastname_kana: string;
	firstname_kana: string;
	hobby: string;
	organization?: string;
	holidayactivity?: string;
	weaknesses?: string;
	FavoriteColor?: string;
	FavoriteAnimal?: string;
	FavoritePlace?: string;
	Language?: string;
	Age?: string;
	Birthday?: string;
	Gender?: string;
	Nickname?: string;
};

export type GroupType = {
	groupId: string;
	groupName: string;
};
