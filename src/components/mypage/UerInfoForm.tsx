import { useForm } from 'react-hook-form';
import { SignUpType } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpSchema } from '@/utils/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from 'aws-amplify/auth';
import { useOneTimePassStore } from '@/store/oneTimePassStore';

function UserInfoForm() {
	return <div>{/*ユーザー情報を入力して完了ボタンを押すまで実装*/}</div>;
}

export default UserInfoForm;
