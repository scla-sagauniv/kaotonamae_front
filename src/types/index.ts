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
	favoriteColor?: string;
	favoriteAnimal?: string;
	favoritePlace?: string;
	language?: string;
	birthday?: string;
	gender?: string;
	nickname?: string;
	icon: string;
};

export type GroupType = {
	group_id: string;
	group_name: string;
	group_description: string;
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

export type FriendNameType = {
	userId: string;
	userName: string;
	userIcon: string;
};

export type EditMyPageProps = {
	UserInfoFunction: (
		data: ProfileInfoType,
		userId: string,
		upLoadImageUrl: string,
	) => Promise<void>;
};
