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
	overview: string;
};

export type GroupMemberType = {
	groupId: string;
	userId: string;
	memberName: string;
	photo: string;
};

export type FriendType = {
	friendId: string;
	friendName: string;
	photo: string;
};

export type QuizHint = {
	Hint1: string;
	Hint2: string;
	Hint3: string;
};

export type QuizType = {
	quizQuestionTop: string;
	quizQuestionBottom: string;
	quizAnswer: string;
	quizHint: QuizHint;
	userPhoto: string;
};
